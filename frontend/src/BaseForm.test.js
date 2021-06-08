import React from "react";
import { render } from "@testing-library/react";
import BaseForm from "./BaseForm";

const inputs = [
  { name: "input1", label: "Input 1", type: "text", default: "" },
  { name: "input2", label: "Input 2", type: "text", default: "" }
];
const callback = jest.fn();

it("renders without crashing", () => {
  render(
    <BaseForm
      title="Form"
      inputs={ inputs }
      btnText="Button Text"
      submitCallback={ callback }
    />
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <BaseForm
      title="Form"
      inputs={ inputs }
      btnText="Button Text"
      submitCallback={ callback }
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
