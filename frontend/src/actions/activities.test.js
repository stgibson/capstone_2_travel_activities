import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  LOAD_FAVORITE_ACTIVITIES,
  ADD_FAVORITE_ACTIVITY,
  REMOVE_FAVORITE_ACTIVITY
} from "../actionTypes";
import {
  getFavoriteActivitiesFromAPI,
  addFavoriteActivityToAPI,
  removeFavoriteActivityFromAPI
} from "./activities";


const middlewares = [thunk]; // Learned how to mock Redux with thunks at https://redux.js.org/recipes/writing-tests
const mockStore = configureMockStore(middlewares);

jest.mock('axios'); // Learned how to mock axios at https://jestjs.io/docs/mock-functions

// placeholder token
const token = "TOKEN";

describe("favorite activities action creators", () => {
  it("can create action to load favorite activities from API", async () => {
    const activities = [
      { id: 1, name: "Eiffel Tower" },
      { id: 2, name: "Empire State Building" }
    ];
    const res = { data: { activities } };
    axios.get.mockResolvedValue(res);

    const store = mockStore({});

    return store.dispatch(getFavoriteActivitiesFromAPI(token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0])
        .toEqual({ type: LOAD_FAVORITE_ACTIVITIES, activities });
    });
  });

  it("can create activity to add favorite activity to store", async () => {
    const activity = {
      id: 1,
      name: "Eiffel Tower"
    };
    const res = { data: { activity } };
    axios.get.mockResolvedValue(res);

    const store = mockStore({});

    return store.dispatch(addFavoriteActivityToAPI(activity.id, token))
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toEqual(1);
        expect(actions[0]).toEqual({ type: ADD_FAVORITE_ACTIVITY, activity });
      });
  });

  it("can create activity to remove favorite activity from store",
    async () => {
    const store = mockStore({});

    return store.dispatch(removeFavoriteActivityFromAPI(1, token)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toEqual(1);
      expect(actions[0]).toEqual({ type: REMOVE_FAVORITE_ACTIVITY, id: 1 });
    });
  });
});