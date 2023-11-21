import axios from "axios";
import { getAccessToken, getRoleToken } from "../../utils/auth";
import ResponseCodes from "../../helpers/responseCodes";

import store from "../../store/store";
import * as authActions from "../../store/actions/auth";
import * as commonActions from "../../store/actions/common";

const BEARER = "Bearer";

const axiosInstance = axios.create();

const detachAccessToken = (config = {}) =>
  !!(
    Object.hasOwn(config, "detachAccessToken") &&
    config.detachAccessToken
  );

const detachRoleToken = (config = {}) =>
  !!(
    Object.hasOwn(config, "detachRoleToken") &&
    config.detachRoleToken
  );

const requestHandler = (request) => {
  if (!detachAccessToken(request)) {
    console.log("token attached", getAccessToken());
    request.headers.Authorization = `${BEARER} ${getAccessToken()}`;
  }
  if (!detachRoleToken(request)) {
    console.log("Role token attached");
    request.headers["Role-Token"] = `${getRoleToken()}`;
  }
  return request;
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

const successHandler = (response) => response;

const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response?.status === ResponseCodes.ERROR.UNAUTHORIZED.CODE) {
      store.dispatch(
        commonActions.showErrorAlert({
          message: ResponseCodes.ERROR.UNAUTHORIZED.MSG,
        })
      );
      store.dispatch(authActions.tokenExpired());
    } else if (
      error.response?.status === ResponseCodes.ERROR.PERMISSION_ERROR.CODE
    ) {
      console.log("User permission role error");
      store.dispatch(authActions.tokenExpired());
    } else if (
      error.response?.status === ResponseCodes.ERROR.INTERNAL_SERVER_ERROR.CODE
    ) {
      console.log("Internal server error");
    } else if (
      error.response?.status === ResponseCodes.ERROR.VALIDATION_ERROR.CODE
    ) {
      console.log("Validation error");
      store.dispatch(
        commonActions.showErrorAlert({ message: "Validation error" })
      );
    } else if (
      error.response?.status === ResponseCodes.ERROR.LOGIN_ERROR.CODE
    ) {
       store.dispatch(
        commonActions.showErrorAlert({ message:  error.response.data.message })
      );
    } else {
      console.log("Other error");
      store.dispatch(commonActions.showErrorAlert({ message: "Other error" }));
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export const get = (url, config) => axiosInstance.get(url, config);

export const post = (url, body, config) =>
  axiosInstance.post(url, body, config);

export const put = (url, body, config) => axiosInstance.put(url, body, config);

export const del = (url, body, config) =>
  axiosInstance.delete(url, { data: body }, config);

export const patch = (url, body, config) =>
  axiosInstance.patch(url, body, config);
