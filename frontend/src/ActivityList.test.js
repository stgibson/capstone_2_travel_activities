import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import ActivityList from "./ActivityList";
import rootReducer from "./reducers/root";

const activities = [
  { id: 1, name: "Test Activity 1" },
  { id: 2, name: "Test Activity 2" }
];

let store;
beforeEach(() => {
  store = createStore(rootReducer);
});

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter>
        <ActivityList title="Activity List" activities={ activities } />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter>
        <ActivityList title="Activity List" activities={ activities } />
      </MemoryRouter>
    </Provider>
  );
  
  expect(asFragment()).toMatchSnapshot();
});