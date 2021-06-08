import { SET_TOKEN, REMOVE_TOKEN, RESET_ALL } from "../actionTypes";
import token from "./token";

describe("token reducer", () => {
  it("sets token", () => {
    expect(token(null, { type: SET_TOKEN, token: "TOKEN" })).toEqual("TOKEN");
  });

  it("removes token", () => {
    expect(token("TOKEN", { type: REMOVE_TOKEN })).toEqual(null);
  });

  it("doesn't change state with unrecognized action type", () => {
    expect(token("TOKEN", { type: "ANOTHER_TYPE" })).toEqual("TOKEN");
  });
});