import reducer, { SET_TOKEN_EXPIRY_STATUS } from './auth';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    isTokenExpired: false,
  });
});

test('should handle token expired set', () => {
  const previousState = {
    isTokenExpired: false,
  };

  expect(reducer(previousState, SET_TOKEN_EXPIRY_STATUS(true))).toEqual({
    isTokenExpired: true,
  });
});
