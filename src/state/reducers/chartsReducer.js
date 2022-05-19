/* eslint-disable */
import { DELETE_CHART, LOAD_CHARTS, SET_CHARTS_LOADING } from "../actions/actionTypes";

export default function (state = {
  charts: [],
  isLoading: false,
}, action) {
  switch (action.type) {
    case LOAD_CHARTS:
      return {
        ...state,
        charts: action.payload,
        isLoading: false
      };
    case SET_CHARTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DELETE_CHART:
      return {
        ...state,
        isLoading: state.charts.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
}
