import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAuth } from "../AuthProvider";

import { USER } from "../../../helpers/auth";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const { registerUserFlow } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(USER.USER_NAME_REQUIRED)
      .min(3, USER.USER_NAME_VALIDATION),
    password: Yup.string()
      .required(USER.PASSWORD_REQUIRED)
      .min(6, USER.PASSWORD_VALIDATIOM),
    confirmPassword: Yup.string() // Validate password confirmation
      .oneOf([Yup.ref(USER.PASSWORD), null], USER.PASSWORD_MATCH),
  });

  const onSubmit = async (values, { resetForm }) => {
    const user = values.username;
    const pwd = values.password;
    registerUserFlow(user, pwd);
    resetForm();
  };

  return (
    <main className="App">
      <section>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="fieldWrapper"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="fieldWrapper"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="fieldWrapper"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <Button type="submit" variant="light" data-testid="signup-button">
              Signup
            </Button>
          </Form>
        </Formik>
        <p>
          Already registered?
          <br />
          <span className="line" data-testid="signin-span">
            <Link to="/">Sign In</Link>
          </span>
        </p>
      </section>
    </main>
  );
};

export default Register;
