import { SET_TOKEN, REMOVE_TOKEN } from "../actionTypes";
import { setToken, removeToken } from "./token";

describe("token action creators", () => {
  it("creates action to set token", () => {
    expect(setToken("TOKEN")).toEqual({ type: SET_TOKEN, token: "TOKEN" });
  });

  it("creates action to remove token", () => {
    expect(removeToken()).toEqual({ type: REMOVE_TOKEN });
  });
});