import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/dom";
import BoardItem from "./BoardItem";

afterEach(cleanup);

describe("<BoardItem />", () => {
  it("test basic rendering without image", () => {
    const mockFn = jest.fn();

    const { getByTestId, queryByTestId, asFragment } = render(
      <BoardItem title="board-item-title" price="12.00" onClick={mockFn} />
    );

    expect(getByTestId("title-tag")).toHaveTextContent("board-item-title");
    expect(getByTestId("price-tag")).toHaveTextContent("US $12.00");
    expect(queryByTestId("image-tag")).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it("test basic rendering with image", () => {
    const mockFn = jest.fn();

    const { getByTestId, asFragment } = render(
      <BoardItem
        imageURL="http://www.someimage.com"
        title="board-item-title"
        price="12.00"
        onClick={mockFn}
      />
    );

    expect(getByTestId("title-tag")).toHaveTextContent("board-item-title");
    expect(getByTestId("price-tag")).toHaveTextContent("US $12.00");
    expect(getByTestId("price-tag")).toHaveTextContent("US $12.00");
    expect(getByTestId("image-tag")).toHaveAttribute(
      "src",
      "http://www.someimage.com"
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("test fire event click", () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <BoardItem
        imageURL="http://www.someimage.com"
        title="board-item-title"
        price="12.00"
        onClick={mockFn}
      />
    );

    fireEvent.click(getByTestId("button-tag"));

    expect(mockFn).toHaveBeenCalled();
  });
});
