import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

it("renders without crashing", () => {
  render(
    <Provider store={ store }><MemoryRouter><App /></MemoryRouter></Provider>
  );
});
