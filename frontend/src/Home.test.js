import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Home from "./Home";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

const getActivitiesByLocation = jest.fn();

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter>
        <Home getActivitiesByLocation={ getActivitiesByLocation } />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter>
        <Home getActivitiesByLocation={ getActivitiesByLocation } />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
