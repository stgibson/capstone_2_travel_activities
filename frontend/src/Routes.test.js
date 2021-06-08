import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Routes from "./Routes";
import rootReducer from "./reducers/root";

const store = createStore(rootReducer);

const signup = jest.fn();
const login = jest.fn();
const getActivitiesByLocation = jest.fn();
const getActivityDetails = jest.fn();

it("renders without crashing", () => {
  render(
    <Provider store={ store }>
      <MemoryRouter>
        <Routes
          signup={ signup }
          login={ login }
          getActivitiesByLocation={ getActivitiesByLocation }
          getActivityDetails={ getActivityDetails }
        />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={ store }>
      <MemoryRouter>
        <Routes
          signup={ signup }
          login={ login }
          getActivitiesByLocation={ getActivitiesByLocation }
          getActivityDetails={ getActivityDetails }
        />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
