"use strict";

import { Response, Request } from "express";
import { ObjectID } from "mongodb";
import agenda from "../agenda";
import Agenda from "agenda";
import { findItemsBySearchPhrase } from "../util/ebay";
import sgMail from "@sendgrid/mail";
import { uglyEbayItem } from "../util/uglyemail";

sgMail.setApiKey(process.env.SEND_GRID);

const intervals = {
  "2": "2 minutes",
  "10": "10 minutes",
  "30": "30 minutes"
};

const possibleIntervals = ["2", "10", "30"];

/**
 * GET /api
 * List of API examples.
 */
export const query = async (req: Request, res: Response) => {
  const { searchPhrase } = req.query;

  try {
    const data = await findItemsBySearchPhrase(searchPhrase.replace(/ /g, "+"));

    return res.json({
      success: true,
      data
    });
  } catch (err) {
    res.json({
      success: false,
      data: err
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { searchPhrase, interval, email } = req.body;

  try {
    const jobs = await agenda.jobs<{
      searchPhrase: string;
    }>({
      name: "send email report",
      "data.to": email,
      "data.searchPhrase": searchPhrase
    });

    if (jobs.length > 0) {
      return res.json({
        success: false,
        data: {
          message: "search phrase already registered"
        }
      });
    }

    const weeklyReport = agenda.create("send email report", {
      to: email,
      searchPhrase
    });

    if (!possibleIntervals.includes(interval)) {
      return res.json({
        success: false,
        data: {
          message: "interval not valid"
        }
      });
    }

    const every = intervals[interval as "2" | "10" | "30"];

    const job = await weeklyReport.repeatEvery(every).save();
    return res.json({
      success: true,
      data: mapJobToResponse(job)
    });
  } catch (err) {
    return res.json({
      data: err,
      success: false
    });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const jobs = await agenda.jobs<{
      to: string;
      searchPhrase: string;
    }>({
      name: "send email report"
    });

    const data = jobs.map(mapJobToResponse);

    return res.json({
      data,
      success: true
    });
  } catch (err) {
    return res.json({
      data: err,
      success: false
    });
  }
};

export const cancel = async (req: Request, res: Response) => {
  const { _id } = req.params;

  try {
    await agenda.cancel({
      _id: new ObjectID(_id)
    });
    return res.json({
      success: true
    });
  } catch (err) {
    return res.json({
      data: err,
      success: false
    });
  }
};

const mapJobToResponse = (
  job: Agenda.Job<{
    to: string;
    searchPhrase: string;
  }>
) => {
  return {
    _id: job.attrs._id,
    email: job.attrs.data.to,
    interval: job.attrs.repeatInterval,
    searchPhrase: job.attrs.data.searchPhrase
  };
};

agenda.define(
  "send email report",
  { priority: "high", concurrency: 10 },
  async (job, done) => {
    const { to, searchPhrase } = job.attrs.data;
    if (process.env.NODE_ENV !== "test") {
      try {
        const data = await findItemsBySearchPhrase(
          searchPhrase.replace(/ /g, "+")
        );
        const msg = {
          to,
          from: "itelofilho@gmail.com",
          subject: "Ebay Promotions",
          text: `
        <table border="1" cellpadding="0" cellspacing="0" width="100%">
        ${data.map(uglyEbayItem)}</table>
        `,
          html: `
        <table border="1" cellpadding="0" cellspacing="0" width="100%">
        ${data.map(uglyEbayItem)}</table>
        `
        };
        sgMail.send(msg);
      } catch (err) {
        console.log(err);
      }
    }

    done();
  }
);
