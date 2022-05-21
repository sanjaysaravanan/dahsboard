/* eslint-disable */
import { DELETE_CHART, LOAD_CHARTS, SET_CHARTS_LOADING, SET_SELECTED_CHART } from "./actionTypes";
import {
  throwNotificationDisplay,
  displayGlobalLoading,
  hideGlobalLoading
} from "./notifyActions";
import { getCharts, postLineChart, postPieChart, 
  postBarChart, deleteChart, getLineChartData } from "../../api/api";


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

export function createChart(payload, chartType) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());

      let response = null;

      switch(chartType){
        case 'line':
          response = await postLineChart(payload);
          break;
        case 'pie':
          response = await postPieChart(payload);
          break;
        case 'bar':
          response = await postBarChart(payload);
          break;
        default:
          break;
      }

      const { charts } = response;

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

export function loadChart(chartData) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      dispatch({
        type: SET_CHARTS_LOADING,
        payload: true,
      });
      const response = await getLineChartData(chartData);
      dispatch({
        type: SET_SELECTED_CHART,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
      dispatch({
        type: SET_CHARTS_LOADING,
        payload: false,
      });
    }
  }
}
