import React from "react";
import { render } from "@testing-library/react";
import Signup from "./Signup";

const signup = jest.fn();

it("renders without crashing", () => {
  render(<Signup signup={ signup } />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Signup signup={ signup } />);

  expect(asFragment()).toMatchSnapshot();
});
