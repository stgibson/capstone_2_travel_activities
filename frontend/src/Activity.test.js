import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Activity from "./Activity";

const activity = { id: 1, name: "Test Activity" };
const btnCallback = jest.fn();

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Activity
        activity={ activity }
        btnText="Button Text"
        btnCallback={ btnCallback }
      />
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Activity
        activity={ activity }
        btnText="Button Text"
        btnCallback={ btnCallback }
      />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});