import reducerTypes from '../reducerTypes';

export const userData = state => state[reducerTypes.user];

export const userId = state => state[reducerTypes.user].id;
export const userName = state => state[reducerTypes.user].name;
