/* eslint-disable */
import { DELETE_CHART, LOAD_CHARTS } from "./actionTypes";
import {
  throwNotificationDisplay,
  displayGlobalLoading,
  hideGlobalLoading
} from "./notifyActions";
import { getCharts, postChart, deleteChart } from "../../api/api";

export function loadCharts() {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const charts = await getCharts();
      dispatch({
        type: LOAD_CHARTS,
        payload: charts,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  }
}

export function createChart(payload) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const { charts } = await postChart(payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch({
        type: LOAD_CHARTS,
        payload: charts,
      })
      // dispatch(throwNotificationDisplay(message || "Report Created", "success"));
    } catch (error) {
      dispatch(
        throwNotificationDisplay("Something went wrong", "error")
      );
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}

export function removeChart(chartId) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      await deleteChart(chartId);
      dispatch({
        type: DELETE_CHART,
        payload: chartId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  }
}
