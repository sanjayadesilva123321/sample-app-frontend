import * as userReducer from '../reducers/user';

export const setUserData = payload => dispatch => {
  dispatch(userReducer.SET_DATA(payload));
};

export const resetUserData = () => dispatch => {
  dispatch(userReducer.RESET());
};
