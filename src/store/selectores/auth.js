import reducerTypes from '../reducerTypes';

// eslint-disable-next-line import/prefer-default-export
export const isTokenExpired = state => state[reducerTypes.auth].isTokenExpired;
