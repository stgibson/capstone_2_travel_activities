import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import EditPlan from "./EditPlan";

const activities = [
  { id: 1, name: "Test Activity 1" },
  { id: 2, name: "Test Activity 2" },
  { id: 3, name: "Test Activity 3" }
];
const plans = {
  1: {
    id: 1,
    name: "Test Plan 1",
    days: { 1: { 1: activities[0], 2: activities[1] }, 2: {} }
  },
  2: { id: 2, name: "Test Plan 2", days: { 1: {}, 2: {} } }
};

const mockStore = configureMockStore();
const store = mockStore({ activities, plans });

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter initialEntries={ ["/plans/1"] }>
        <Route path="/plans/:id"><EditPlan /></Route>
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter initialEntries={ ["/plans/1"] }>
        <Route path="/plans/:id"><EditPlan /></Route>
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
