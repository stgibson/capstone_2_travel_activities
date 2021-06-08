import {
  LOAD_FAVORITE_ACTIVITIES,
  ADD_FAVORITE_ACTIVITY,
  REMOVE_FAVORITE_ACTIVITY,
  RESET_ALL
} from "../actionTypes";
import activities from "./activities";

const favoriteActivities = [
  { id: 1, name: "Activity 1" },
  { id: 2, name: "Activity 2" }
];

describe("favorite activities reducer", () => {
  it("loads favorite activities", () => {
    expect(activities(
      {},
      { type: LOAD_FAVORITE_ACTIVITIES, activities: favoriteActivities }
    )).toEqual({ 1: favoriteActivities[0], 2: favoriteActivities[1] });
  });

  it("adds favorite activity", () => {
    expect(activities(
      {},
      { type: ADD_FAVORITE_ACTIVITY, activity: favoriteActivities[0] }
    )).toEqual({ 1: favoriteActivities[0] });
    expect(activities(
      { 1: favoriteActivities[0] },
      { type: ADD_FAVORITE_ACTIVITY, activity: favoriteActivities[1] }
    )).toEqual({ 1: favoriteActivities[0], 2: favoriteActivities[1] });
  });

  it("removes favorite activity", () => {
    expect(activities(
      { 1: favoriteActivities[0], 2: favoriteActivities[1] },
      { type: REMOVE_FAVORITE_ACTIVITY, id: 2 }
    )).toEqual({ 1: favoriteActivities[0] });
    expect(activities(
      { 1: favoriteActivities[0] },
      { type: REMOVE_FAVORITE_ACTIVITY, id: 1 }
    )).toEqual({});
  });

  it("resets activities", () => {
    expect(activities(
      { 1: favoriteActivities[0], 2: favoriteActivities[1] },
      { type: RESET_ALL }
    )).toEqual({});
  });
});