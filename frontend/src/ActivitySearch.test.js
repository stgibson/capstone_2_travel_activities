import React from "react";
import { render } from "@testing-library/react";
import ActivitySearch from "./ActivitySearch";

const searchActivities = jest.fn();

it("renders without crashing", () => {
  render(<ActivitySearch searchActivities={ searchActivities } />);
});

it("matches snapshot", () => {
  const { asFragment } =
    render(<ActivitySearch searchActivities={ searchActivities } />);
  
  expect(asFragment()).toMatchSnapshot();
});