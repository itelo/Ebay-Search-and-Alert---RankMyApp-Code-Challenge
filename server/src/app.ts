import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import cons from "consolidate";
import path from "path";
import mongoose from "mongoose";

import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import agenda from "./agenda";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as apiController from "./controllers/api";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

agenda.start();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../public"));
app.engine("html", cons.swig);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  })
);

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path;
  } else if (req.user && req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

/**
 * API examples routes.
 */
app.get("/api/query", apiController.query);
app.post("/api/register", apiController.register);
app.delete("/api/cancel/:_id", apiController.cancel);
app.get("/api/list", apiController.list);

app.get("/*", (req, res) => {
  res.render("index.html");
});

export default app;
