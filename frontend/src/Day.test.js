import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Day from "./Day";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

const activities = [
  { id: 1, name: "Test Activity 1" },
  { id: 2, name: "Test Activity 2" }
];
const day = { number: 1, activities };

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter><Day day={ day } planId={ 1 } /></MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter><Day day={ day } planId={ 1 } /></MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
