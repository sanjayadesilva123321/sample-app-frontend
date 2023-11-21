import { v1 as uuidv1 } from "uuid";

import * as commonReducer from "../reducers/common";
import { TOAST_ALERT_TYPES } from "../../helpers/common";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

/* -------------------------------------------------------------------------- */
/*                                 Toast alert                                */
/* -------------------------------------------------------------------------- */
export const showToastAlert = (data) => (dispatch) => {
  data.id = uuidv1();
  data.show = true;
  dispatch(commonReducer.SHOW_TOAST_ALERT(data));
};

export const hideToastAlert = (id) => (dispatch) => {
  dispatch(commonReducer.HIDE_TOAST_ALERT(id));
};

export const showErrorAlert = (data) => (dispatch) => {
  data.type = TOAST_ALERT_TYPES.ERROR.type;
  dispatch(showToastAlert(data));
};

export const showSuccessAlert = (data) => (dispatch) => {
  data.type = TOAST_ALERT_TYPES.SUCCESS.type;
  dispatch(showToastAlert(data));
};
