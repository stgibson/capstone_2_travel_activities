import { SHOW_ERR } from "../actionTypes";
import { showErr } from "./errors";

describe("error action creators", () => {
  it("creates action to add error", () => {
    expect(showErr("Invalid data"))
      .toEqual({ type: SHOW_ERR, msg: "Invalid data" });
  });
});