import { get, post } from '../libs/api/apiWrapper';

import APIs from '../helpers/apiRoutes';

/**
 * Login user by sending a POST request with user credentials.
 * @param {object} payload - User credentials for login.
 * @returns {Promise} Successful login or rejects with an error.
 */
const loginUser = async payload => {
  try {
    const response = await post(APIs.AUTH.LOGIN, payload, {
      detachRoleToken: true,
      detachAccessToken: true,
    });
    return response.data;
  } catch (e) {
    console.log('login user error', e);
    throw e;
  }
};

/**
 * Register a new user by sending a POST request with user registration data.
 * @param {object} payload - User registration data.
 * @returns {Promise} Successful registration or rejects with an error.
 */
const registerUser = async payload => {
  try {
    return await post(APIs.AUTH.REGISTER, payload, {
      detachRoleToken: true,
      detachAccessToken: true,
    });
  } catch (e) {
    console.log('register user error', e);
    throw e;
  }
};

const getUserRoles = async () => {
  try {
    const response = await get(APIs.AUTH.ROLES);
    return response.data;
  } catch (e) {
    console.log('get user roles error', e);
    throw e;
  }
};

export { loginUser, registerUser, getUserRoles };
