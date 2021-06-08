import { SHOW_ERR } from "../actionTypes";
import errors from "./errors";

describe("errors reducer", () => {
  it("adds error message", () => {
    const msg1 = "Error Message 1";
    const msg2 = "Error Message 2";
    expect(errors([], { type: SHOW_ERR, msg: msg1 })).toEqual([msg1]);
    expect(errors([msg1], { type: SHOW_ERR, msg: msg2 })).toEqual([msg1, msg2]);
  });

  it("resets errors state if action type isn't recognized", () => {
    const errorsState = ["Error Message 1", "Error Message 2"];
    expect(errors(errorsState, { type: "ANOTHER_TYPE" })).toEqual([]);
  });
});