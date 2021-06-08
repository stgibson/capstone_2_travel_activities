import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import ActivityDetails from "./ActivityDetails";

const activity = {
  id: 1,
  name: "Test Activity",
  description: "Test Description",
  rating: "Test Rating",
  bookingLink: "Test Booking Link",
  price: "Test Price",
  currencyCode: "Test Currency Code"
};

let getActivityDetails;

beforeEach(() => {
  getActivityDetails = jest.fn(id => {
    if (id === 1) {
      return activity;
    }
    return null;
  });
});

// determined how to test components that use useParams at https://tomalexhughes.com/blog/testing-components-that-use-react-router-hooks
it("renders without crashing", () => {
  render(
    <MemoryRouter initialEntries={ ["/activities/1"] }>
      <Route path="/activities/:id">
        <ActivityDetails getActivityDetails={ getActivityDetails } />
      </Route>
    </MemoryRouter>
  );
});

it("renders without crashing", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={ ["/activities/1"] }>
      <Route path="/activities/:id">
        <ActivityDetails getActivityDetails={ getActivityDetails } />
      </Route>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});