import reducer, { SHOW_TOAST_ALERT, HIDE_TOAST_ALERT } from './common';

const defaultPreviousState = {
  toastAlerts: [],
};

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    toastAlerts: [],
  });
});

test('should handle "SHOW_TOAST_ALERT"', () => {
  expect(reducer(defaultPreviousState, SHOW_TOAST_ALERT({ id: 1, show: true }))).toEqual({
    toastAlerts: [{ id: 1, show: true }],
  });
});

test('should handle "HIDE_TOAST_ALERT"', () => {
  const previousState = {
    toastAlerts: [
      { id: 1, show: true },
      { id: 2, show: true },
      { id: 3, show: true },
    ],
  };

  expect(reducer(previousState, HIDE_TOAST_ALERT(2))).toEqual({
    toastAlerts: [
      { id: 1, show: true },
      { id: 3, show: true },
    ],
  });
});
