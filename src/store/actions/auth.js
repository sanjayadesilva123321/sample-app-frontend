import * as authReducer from '../reducers/auth';

export const tokenRenewed = () => dispatch => {
  dispatch(authReducer.SET_TOKEN_EXPIRY_STATUS(false));
};

export const tokenExpired = () => dispatch => {
  dispatch(authReducer.SET_TOKEN_EXPIRY_STATUS(true));
};
