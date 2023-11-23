import { BACKEND_API_BASE_URL } from '../config/config';

export default Object.freeze({
  POSTS: {
    GET_POSTS: `${BACKEND_API_BASE_URL}/posts`,
    DELETE_POST: `${BACKEND_API_BASE_URL}/posts`,
    UPDATE_POST: `${BACKEND_API_BASE_URL}/posts`,
  },
  AUTH: {
    LOGIN: `${BACKEND_API_BASE_URL}/users/login`,
    REGISTER: `${BACKEND_API_BASE_URL}/users/signup`,
    ROLES: `${BACKEND_API_BASE_URL}/users/roles`,
  },
});
