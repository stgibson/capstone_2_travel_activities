import {
  LOAD_PLANS,
  ADD_PLAN,
  ADD_ACTIVITY_TO_PLAN,
  REMOVE_ACTIVITY_FROM_PLAN,
  RESET_ALL
} from "../actionTypes";
import plans from "./plans";

const activity1 = { id: 1, name: "Test Activity 1" };
const activity2 = { id: 2, name: "Test Activity 2"};
const testPlans = [
  {
    id: 1,
    name: "Test Plan 1",
    days: { 1: { 1: activity1, 2: activity2 }, 2: {} }
  },
  { id: 2, name: "Test Plan 2", days: { 1: {}, 2: {} } }
];

describe("travel plans reducer", () => {
  it("loads plans", () => {
    expect(plans(
      {},
      { type: LOAD_PLANS, plans: testPlans }
    )).toEqual({
      1: {
        id: 1,
        name: "Test Plan 1",
        days: {
          1: { 1: activity1, 2: activity2 },
          2: {}
        }
      },
      2: { id: 2, name: "Test Plan 2", days: { 1: {}, 2: {} } }
    });
  });

  it("adds plan", () => {
    expect(plans(
      {},
      { type: ADD_PLAN, plan: testPlans[0] }
    )).toEqual({ 1: testPlans[0] });
    expect(plans(
      { 1: testPlans[0] },
      { type: ADD_PLAN, plan: testPlans[1] }
    )).toEqual({ 1: testPlans[0], 2: testPlans[1] });
  });

  it("adds activity to plan", () => {
    const newActivity = { id: 3, name: "Test Activity 3" };

    expect(plans(
      { 1: testPlans[0] },
      {
        type: ADD_ACTIVITY_TO_PLAN,
        payload: { planId: 1, dayNumber: 1, activity: newActivity }
      }
    )).toEqual({
      1: {
        id: 1,
        name: "Test Plan 1",
        days: { 1: { 1: activity1, 2: activity2, 3: newActivity }, 2: {} }
      }
    });
  });

  it("removes activity to plan", () => {
    expect(plans(
      { 1: testPlans[0] },
      {
        type: REMOVE_ACTIVITY_FROM_PLAN,
        payload: { planId: 1, dayNumber: 1, activityId: 2 }
      }
    )).toEqual({
      1: {
        id: 1,
        name: "Test Plan 1",
        days: { 1: { 1: activity1 }, 2: {} }
      }
    });
    expect(plans(
      {
        1: {
          id: 1,
          name: "Test Plan 1",
          days: { 1: { 1: activity1 }, 2: {} }
        }
      },
      {
        type: REMOVE_ACTIVITY_FROM_PLAN,
        payload: { planId: 1, dayNumber: 1, activityId: 1 }
      }
    )).toEqual({
      1: {
        id: 1,
        name: "Test Plan 1",
        days: { 1: {}, 2: {} }
      }
    });
  });

  it("doesn't change state with unrecognized action type", () => {
    expect(plans(
      { 1: testPlans[0], 2: testPlans[1] },
      { type: "ANOTHER_TYPE" }
    )).toEqual({ 1: testPlans[0], 2: testPlans[1] });
  });
});