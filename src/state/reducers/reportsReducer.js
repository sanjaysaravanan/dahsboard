/* eslint-disable */
import { LOAD_REPORTS, ADD_REPORT, DELETE_REPORT } from "../actions/actionTypes";

export default function (state = {
  reports: [],
  isLoading: false,
}, action) {
  switch (action.type) {
    case LOAD_REPORTS:
      return {
        ...state,
        reports: action.payload,
        isLoading: false
      }
    case ADD_REPORT:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_REPORT:
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state;
  }
}
