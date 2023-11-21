import * as APIConnector from "./apiConnector";

export const get = (url, config = {}) => APIConnector.get(url, config);

export const post = (url, body, config = {}) =>
  APIConnector.post(url, body, config);

export const del = (url, body = {}, config = {}) =>
  APIConnector.del(url, body, config);

export const put = (url, body = {}, config = {}) =>
  APIConnector.put(url, body, config);

export const patch = (url, body = {}, config = {}) =>
  APIConnector.patch(url, body, config);
