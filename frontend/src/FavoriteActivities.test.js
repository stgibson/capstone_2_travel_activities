import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import FavoriteActivities from "./FavoriteActivities";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter><FavoriteActivities />
    </MemoryRouter></Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter><FavoriteActivities />
    </MemoryRouter></Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
