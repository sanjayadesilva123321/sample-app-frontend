const baseRoutes = Object.freeze({
  ROOT: {
    NAME: '',
    PATH: '/',
  },
  ALL: {
    NAME: 'All',
    PATH: '*',
  },
  UN_AUTHENTICATED: {
    LOGIN: {
      NAME: 'Login',
      PATH: 'login',
    },
    REGISTER: {
      NAME: 'Register',
      PATH: 'register',
    },
  },
  AUTHENTICATED: {
    EDITOR: {
      NAME: 'Editor',
      PATH: 'editor',
    },
    UNAUTHORIZED: {
      NAME: 'Unauthorized',
      PATH: 'unauthorized',
    },
  },
});

const routes = Object.freeze({
  ROOT: {
    ...baseRoutes.ROOT,
    FULL_PATH: baseRoutes.ROOT.PATH,
  },
  ALL: {
    ...baseRoutes.ALL,
  },
  UN_AUTHENTICATED: {
    LOGIN: {
      ...baseRoutes.UN_AUTHENTICATED.LOGIN,
      FULL_PATH: `/${baseRoutes.UN_AUTHENTICATED.LOGIN.PATH}`,
    },
    REGISTER: {
      ...baseRoutes.UN_AUTHENTICATED.REGISTER,
      FULL_PATH: `/${baseRoutes.UN_AUTHENTICATED.REGISTER.PATH}`,
    },
  },
  AUTHENTICATED: {
    EDITOR: {
      ...baseRoutes.AUTHENTICATED.EDITOR,
      FULL_PATH: `/${baseRoutes.AUTHENTICATED.EDITOR.PATH}`,
    },
    UNAUTHORIZED: {
      ...baseRoutes.AUTHENTICATED.UNAUTHORIZED,
      FULL_PATH: `/${baseRoutes.AUTHENTICATED.UNAUTHORIZED.PATH}`,
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export { routes };
