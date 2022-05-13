/* eslint-disable */
import { ADD_REPORT } from "./actionTypes";
import {
  throwNotificationDisplay,
  displayGlobalLoading,
  hideGlobalLoading
} from "./notifyActions";
import { users } from "../../api";

export function createReport(user) {
  return async function (dispatch) {
    try {
      dispatch(displayGlobalLoading());
      const result = await users.createUser(user);
      dispatch({
        type: ADD_REPORT,
        payload: null
      });
      dispatch(throwNotificationDisplay(result?.message, "success", user));
    } catch (error) {
      dispatch({ type: USER_ERROR });
      dispatch(
        throwNotificationDisplay(error?.response.data.errorMsg, "error", user)
      );
    } finally {
      dispatch(hideGlobalLoading());
    }
  };
}
