import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

const login = jest.fn();

it("renders without crashing", () => {
  render(<Login login={ login } />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Login login={ login } />);

  expect(asFragment()).toMatchSnapshot();
});
