/* eslint-disable */
import { ADD_REPORT, LOAD_REPORTS } from "./actionTypes";
import {
  throwNotificationDisplay,
  displayGlobalLoading,
  hideGlobalLoading
} from "./notifyActions";
import { getReports, postReport } from "../../api/api";

export function loadReports() {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const reports = await getReports();
      console.log(reports);
      dispatch({
        type: LOAD_REPORTS,
        payload: reports,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideGlobalLoading());
    }
  }
}

export function createReport(payload) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const result = await reportsData( payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(throwNotificationDisplay(result?.message, "success"));
    } catch (error) {
      dispatch(
        throwNotificationDisplay("Something went wrong", "error")
      );
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}
