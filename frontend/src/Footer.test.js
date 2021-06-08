import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

it("renders without crashing", () => {
  render(<Footer />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Footer />);

  expect(asFragment()).toMatchSnapshot();
});
