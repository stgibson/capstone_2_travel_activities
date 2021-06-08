import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import PlanList from "./PlanList";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter><PlanList /></MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter><PlanList /></MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
