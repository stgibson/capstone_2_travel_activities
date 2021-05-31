import dotenv from "dotenv";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  LOAD_PLANS,
  ADD_PLAN,
  ADD_ACTIVITY_TO_PLAN,
  REMOVE_ACTIVITY_FROM_PLAN
} from "../actionTypes";
import {
  getPlansFromAPI,
  addPlanToAPI,
  addActivityToDayInAPI,
  removeActivityFromDayInAPI
} from "./plans";

dotenv.config();

const middlewares = [thunk]; // Learned how to mock Redux with thunks at https://redux.js.org/recipes/writing-tests
const mockStore = configureMockStore(middlewares);

jest.mock('axios'); // Learned how to mock axios at https://jestjs.io/docs/mock-functions

// placeholder token
const token = "TOKEN";

describe("travel plans action creators", () => {
  it("can create action to load plans from API", async () => {
    const activity = {
      id: 1,
      name: "Eiffel Tower",
      description: "It lights up at night",
      rating: "4.5",
      bookingLink: "http://signupforeiffeltower.com",
      price: "300",
      currencyCode: "EUR",
      cityId: 1
    };
    const plans = [
      { id: 1, name: "Test Plan 1" },
      { id: 2, name: "Test Plan 2" }
    ];
    const plan1 = { id: 1, name: "Test Plan 1", days: [{ id: 1, number: 1}, { id: 2, number: 2 }] };
    const plan2 = { id: 2, name: "Test Plan 2", days: [{ id: 3, number: 1}, { id: 4, number: 2 }] };
    const day1 = { id: 1, number: 1, activities: [activity] };
    const day2 = { id: 2, number: 2, activities: [] };
    const day3 = { id: 2, number: 1, activities: [] };
    const day4 = { id: 2, number: 2, activities: [] };

    const res1 = { data: { plans } };
    const res2 = { data: { plan: plan1 } };
    const res3 = { data: { plan: plan2 } };
    const res4 = { data: { day: day1 } };
    const res5 = { data: { day: day2 } };
    const res6 = { data: { day: day3 } };
    const res7 = { data: { day: day4 } };
    // Learned how to mock multiple calls of axios at https://stackoverflow.com/questions/57747392/using-jest-to-mock-multiple-axios-calls
    axios.get.mockImplementation((url) => {
      switch (url) {
        case `${process.env.API_BASE_URL}/plans`:
          return Promise.resolve(res1);
        case `${process.env.API_BASE_URL}/plans/1`:
          return Promise.resolve(res2);
        case `${process.env.API_BASE_URL}/plans/2`:
          return Promise.resolve(res3);
        case `${process.env.API_BASE_URL}/days/1`:
          return Promise.resolve(res4);
        case `${process.env.API_BASE_URL}/days/2`:
          return Promise.resolve(res5);
        case `${process.env.API_BASE_URL}/days/3`:
          return Promise.resolve(res6);
        case `${process.env.API_BASE_URL}/days/4`:
          return Promise.resolve(res7);
        default:
          return Promise.reject(new Error("Invalid URL"));
      }
    });

    const store = mockStore({ plans: {} });

    return store.dispatch(getPlansFromAPI(token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({
        type: LOAD_PLANS,
        plans: [
          {
            id: 1,
            name: "Test Plan 1",
            days: { 1: [{ id: 1, name: "Eiffel Tower" }], 2: [] }
          },
          { id: 2, name: "Test Plan 2", days: { 1: [], 2: [] } }
        ]
      });
    });
  });

  it("can create action to add new plan", async () => {
    const plan = { id: 2, name: "New Test Plan" };
    const res1 = { data: { plan } };
    const res2 = { data: { plan: { ...plan, days: [{ 1: 1 }, { 2: 2 }] } } };
    
    axios.post.mockImplementation((url) => {
      switch (url) {
        case `${process.env.API_BASE_URL}/plans`:
          return Promise.resolve(res1);
        default:
          return Promise.reject(new Error("Invalid URL"));
      }
    });

    const store = mockStore({ plans: {} });

    const data = { name: "New Test Plan", numOfDays: 2 };
    return store.dispatch(addPlanToAPI(data, token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({
        type: ADD_PLAN,
        plan: { id: 2, name: "New Test Plan", days: { 1: [], 2: [] } }
      });
    });
  });

  it("can create action to add activity to plan", async () => {
    const day = {
      id: 1,
      number: 1,
      activities: [{ id: 1, name: "Eiffel Tower" }]
    };
    const res = { data: { day } };
    axios.get.mockImplementation((url) => {
      switch (url) {
        case `${process.env.API_BASE_URL}/days/1`:
          return Promise.resolve(res);
        default:
          return Promise.reject(new Error("Invalid URL"));
      }
    });

    const store = mockStore({ plans: {} });

    return store.dispatch(addActivityToDayInAPI(1, 1, 1, token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({
        type: ADD_ACTIVITY_TO_PLAN,
        payload: {
          planId: 1,
          dayNumber: 1,
          activity: { id: 1, name: "Eiffel Tower" }
        }
      });
    });
  });

  it("can create action to remove activity from plan", async () => {
    const day = { id: 1, number: 1, activities: [] };
    const res = { data: { day } };
    axios.get.mockImplementation((url) => {
      switch (url) {
        case `${process.env.API_BASE_URL}/days/1`:
          return Promise.resolve(res);
        default:
          return Promise.reject(new Error("Invalid URL"));
      }
    });

    const store = mockStore({ plans: {} });

    return store.dispatch(removeActivityFromDayInAPI(1, 1, 1, token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({
        type: REMOVE_ACTIVITY_FROM_PLAN,
        payload: {
          planId: 1,
          dayNumber: 1,
          activityId: 1
        }
      });
    });
  });
});