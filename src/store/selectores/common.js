import reducerTypes from '../reducerTypes';

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

/* -------------------------------------------------------------------------- */
/*                                 Toast alert                                */
/* -------------------------------------------------------------------------- */
// eslint-disable-next-line import/prefer-default-export
export const toastAlerts = state => state[reducerTypes.common].toastAlerts;
