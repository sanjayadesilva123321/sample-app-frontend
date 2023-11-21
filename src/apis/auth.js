import { post, get } from "../libs/api/apiWrapper";

import APIs from "../helpers/apiRoutes";

/**
 * Login user by sending a POST request with user credentials.
 * @param {object} payload - User credentials for login.
 * @returns {Promise} A Promise that resolves to a response indicating successful login or rejects with an error.
 */
const loginUser = async (payload) => {
  try {
    const response = await post(APIs.AUTH.LOGIN, payload, {
      detachRoleToken: true,
      detachAccessToken: true,
    });
    return response.data;
  } catch (e) {
    console.log("login user error", e);
    throw e;
  }
};

/**
 * Register a new user by sending a POST request with user registration data.
 * @param {object} payload - User registration data.
 * @returns {Promise} A Promise that resolves to a response indicating successful registration or rejects with an error.
 */
const registerUser = async (payload) => {
  try {
    const response = await post(APIs.AUTH.REGISTER, payload, {
      detachRoleToken: true,
    });
    return response;
  } catch (e) {
    console.log("register user error", e);
    throw e;
  }
};

const getUserRoles = async () => {
  try {
    const response = await get(`${APIs.AUTH.ROLES}`, {
      detachRoleToken: true,
      detachAccessToken: false,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export { loginUser, registerUser, getUserRoles };
