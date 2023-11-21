export default Object.freeze({
  SUCCESS: {
    OK: {
      CODE: 200,
    },
    CREATED: {
      CODE: 201,
    },
  },
  ERROR: {
    BAD_REQUEST: {
      CODE: 400,
    },
    UNAUTHORIZED: {
      CODE: 401,
      MSG: "User is unauthorized",
    },
    PERMISSION_ERROR: {
      CODE: 406,
    },
    FORBIDDEN: {
      CODE: 403,
    },
    NOT_FOUND: {
      CODE: 404,
    },
    REQUEST_TIMEOUT: {
      CODE: 408,
    },

    INTERNAL_SERVER_ERROR: {
      CODE: 500,
      MSG: "Something went wrong",
    },
    BAD_GATEWAY: {
      CODE: 502,
    },
    SERVICE_UNAVAILABLE: {
      CODE: 503,
    },
    GATEWAY_TIMEOUT: {
      CODE: 504,
    },
    LOGIN_ERROR: {
      CODE: 422,
      MSG: "Invalid credentials"
    },
    ALREADY_EXISTS: {
      ROLE_ALREADY_EXISTS: {
        CODE: 606,
      },
      GROUP_ALREADY_EXISTS: {
        CODE: 610,
      },
      DATA_SOURCE_ALREADY_EXISTS: {
        CODE: 612,
      },
    },
    VALIDATION_ERROR: {
      CODE: 607,
    },
  },
});
