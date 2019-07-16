import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/dom";
import MenuButton from "./MenuButton";

afterEach(cleanup);

jest.mock(
  "popper.js",
  () =>
    class Popper {
      static placements = [
        "auto",
        "auto-end",
        "auto-start",
        "bottom",
        "bottom-end",
        "bottom-start",
        "left",
        "left-end",
        "left-start",
        "right",
        "right-end",
        "right-start",
        "top",
        "top-end",
        "top-start"
      ];

      constructor() {
        return {
          destroy: () => {},
          scheduleUpdate: () => {}
        };
      }
    }
);

describe("<MenuButton />", () => {
  it("test basic rendering when close", () => {
    const mockFn = jest.fn();
    const props = {
      message: "menu-button-message",
      onChange: mockFn,
      data: [
        {
          value: "2" as "2",
          label: "2 min"
        }
      ]
    };
    const { getByTestId, queryByTestId, asFragment } = render(
      <MenuButton {...props} />
    );

    expect(getByTestId("button-message-tag")).toHaveTextContent(
      "menu-button-message"
    );
    expect(queryByTestId("menu-item-tag-2")).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it("test basic rendering when open", () => {
    const mockFn = jest.fn();
    const props = {
      message: "menu-button-message",
      onChange: mockFn,
      data: [
        {
          value: "2" as "2",
          label: "2 min"
        }
      ]
    };
    const { getByTestId, queryByTestId, asFragment, debug } = render(
      <MenuButton {...props} />
    );

    fireEvent.click(getByTestId("button-message-tag"));

    expect(getByTestId("button-message-tag")).toHaveTextContent(
      "menu-button-message"
    );

    expect(getByTestId("menu-item-tag-2")).toHaveTextContent("2 min");

    expect(asFragment()).toMatchSnapshot();
  });

  it("test click to handle change", () => {
    const mockFn = jest.fn();
    const props = {
      message: "menu-button-message",
      onChange: mockFn,
      data: [
        {
          value: "2" as "2",
          label: "2 min"
        }
      ]
    };
    const { getByTestId, queryByTestId, asFragment, debug } = render(
      <MenuButton {...props} />
    );

    fireEvent.click(getByTestId("button-message-tag"));
    fireEvent.click(getByTestId("menu-item-tag-2"));

    expect(mockFn).toHaveBeenCalled();
  });
});
