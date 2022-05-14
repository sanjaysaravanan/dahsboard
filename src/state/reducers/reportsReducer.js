/* eslint-disable */
import { LOAD_REPORTS, ADD_REPORT, DELETE_REPORT, SET_REPORT_LOADING } from "../actions/actionTypes";

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
    case SET_REPORT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state;
  }
}
