import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

import * as authAPIs from '../../apis/auth';

import { routes } from '../../helpers/routes';

import { setAccessToken, setRoleToken, hasAuthTokens, deleteTokens } from '../../utils/auth';

import * as authSelectors from '../../store/selectores/auth';
import { showSuccessAlert } from '../../store/directDispatches/common';
import * as userActions from '../../store/actions/user';

const AuthContext = createContext({});

function AuthProvider(props) {
  const { children } = props;

  /* -------------------------------------------------------------------------- */
  /*                                    Redux                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();

  const [auth, setAuth] = useState({});
  const [userPermissions, setUserPermissions] = useState([]);
  const [isBackendAuthorized, setIsBackendAuthorized] = useState(hasAuthTokens());
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isTokenExpired = useSelector(authSelectors.isTokenExpired);

  const loginUserFlow = useCallback(
    async (user, pwd) => {
      try {
        const from = location.state?.from?.pathname || '/';
        setIsProcessing(true);
        const response = await authAPIs.loginUser({
          email: user,
          password: pwd,
        });
        const accessToken = response?.data?.token;
        const roleToken = response?.data?.roleToken;
        const decoded = roleToken ? jwtDecode(roleToken) : undefined;
        if (decoded !== undefined) {
          const roles = decoded?.roles || [];
          setUserPermissions(roles);
          setAuth({ user, accessToken });
          setAccessToken(accessToken);
          setRoleToken(roleToken);
          dispatch(
            userActions.setUserData({
              id: response?.data?.user?.id,
              name: response?.data?.user?.email,
            }),
          );
          setIsBackendAuthorized(true);
          setIsProcessing(false);
          // navigate to the page where user wanted to go before navigationg to login.
          navigate(from, { replace: true });
        } else {
          setIsBackendAuthorized(false);
          setUserPermissions([]);
          setIsProcessing(false);
          navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
        }
      } catch (err) {
        setIsProcessing(false);
      }
    },
    [location.state?.from?.pathname],
  );

  const registerUserFlow = useCallback(async (user, pwd) => {
    try {
      setIsProcessing(true);
      const response = await authAPIs.registerUser({ email: user, password: pwd });
      if (response?.data?.success) {
        showSuccessAlert(response?.data?.message);
        navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
      }
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setAuth({});
    setIsBackendAuthorized(false);
    deleteTokens();
    navigate(routes.UN_AUTHENTICATED.LOGIN.FULL_PATH);
  }, []);

  useEffect(() => {
    if (isTokenExpired) {
      signOut();
    }
  }, [isTokenExpired]);

  const getUserRoles = useCallback(async () => {
    try {
      const response = await authAPIs.getUserRoles();
      if (response.data) {
        setUserPermissions(response.data);
      } else {
        setUserPermissions([]);
      }
    } catch (error) {
      setUserPermissions([]);
    }
  }, []);

  useEffect(() => {
    getUserRoles();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              Permission check                              */
  /* -------------------------------------------------------------------------- */
  const hasPermission = useCallback(
    (requiredPermissions = []) =>
      userPermissions?.find(role => requiredPermissions?.includes(role)),
    [userPermissions],
  );

  /* -------------------------------------------------------------------------- */
  /*                                Return values                               */
  /* -------------------------------------------------------------------------- */
  const value = useMemo(
    () => ({
      auth,
      setAuth,
      isBackendAuthorized,
      userPermissions,
      isProcessing,
      setIsBackendAuthorized,
      registerUserFlow,
      hasPermission,
      loginUserFlow,
      signOut,
    }),
    [
      auth,
      setAuth,
      isBackendAuthorized,
      userPermissions,
      isProcessing,
      setIsBackendAuthorized,
      registerUserFlow,
      hasPermission,
      loginUserFlow,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth, AuthContext };
