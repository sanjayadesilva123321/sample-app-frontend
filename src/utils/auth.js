import localStorageHelper from '../helpers/localStorage';

import {
  getSingleData,
  setSingleData,
  hasData,
  removeSingleData,
} from '../libs/localStorageWrapper';

const hasAuthToken = () => hasData(localStorageHelper.AUTH.ACCESS_TOKEN);
const hasRoleToken = () => hasData(localStorageHelper.AUTH.ROLE_TOKEN);
const hasAuthTokens = () => hasAuthToken() && hasRoleToken();

const getAccessToken = () => getSingleData(localStorageHelper.AUTH.ACCESS_TOKEN);
const setAccessToken = token => setSingleData(localStorageHelper.AUTH.ACCESS_TOKEN, token);
const getRoleToken = () => getSingleData(localStorageHelper.AUTH.ROLE_TOKEN);
const setRoleToken = token => setSingleData(localStorageHelper.AUTH.ROLE_TOKEN, token);

const deleteAccessToken = () => removeSingleData(localStorageHelper.AUTH.ACCESS_TOKEN);
const deleteRoleToken = () => removeSingleData(localStorageHelper.AUTH.ROLE_TOKEN);

const deleteTokens = () => {
  deleteAccessToken();
  deleteRoleToken();
};

export { getAccessToken, setAccessToken, getRoleToken, setRoleToken, hasAuthTokens, deleteTokens };
