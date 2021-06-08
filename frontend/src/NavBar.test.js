import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

const logout = jest.fn();

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter><NavBar logout={ logout } /></MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter><NavBar logout={ logout } /></MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
