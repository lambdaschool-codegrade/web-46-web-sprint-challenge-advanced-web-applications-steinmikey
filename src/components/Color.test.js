import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";

const testColor = {
  color: "",
  code: {
    hex: ""
  },
  id: 1
};

test("Renders without errors with blank color passed into component", () => {
  render(<Color color={testColor} />);
});

test("Renders the color passed into component", () => {
  testColor.color = "turquoise";
  render(<Color color={testColor} />);
  const sampledColor = screen.queryByTestId("color");
  expect(sampledColor).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const deleteColor = jest.fn();
  const toggleEdit = jest.fn();
  render(<Color color={testColor} deleteColor={deleteColor} toggleEdit={toggleEdit} />);
  const xButton = screen.queryByTestId("delete");
  userEvent.click(xButton);
  expect(deleteColor).toHaveBeenCalled();
  expect(toggleEdit).toHaveBeenCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
  const setEditColor = jest.fn();
  const toggleEdit = jest.fn();
  render(<Color color={testColor} setEditColor={setEditColor} toggleEdit={toggleEdit} />);
  const colorDiv = screen.queryByTestId("color");
  userEvent.click(colorDiv);
  expect(setEditColor).toHaveBeenCalled();
  expect(toggleEdit).toHaveBeenCalled();
});
