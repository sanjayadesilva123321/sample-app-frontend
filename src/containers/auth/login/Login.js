import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useAuth } from "../AuthProvider";

import { USER } from "../../../helpers/auth";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const { loginUserFlow } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required(USER.USER_NAME_REQUIRED),
    password: Yup.string().required(USER.PASSWORD_REQUIRED),
  });

  const onSubmit = async (values, { resetForm }) => {
    const user = values.username;
    const pwd = values.password;
    loginUserFlow(user,pwd);
    resetForm();
  };

  return (
    <main className="App">
      <section>
        <h2>Sign In</h2>
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
            <Button type="submit" variant="light" data-testid="signin-button">
              Sign In
            </Button>
          </Form>
        </Formik>
        <p>
          Need an Account?
          <br />
          <span className="line" data-testid="signup-span">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </main>
  );
};

export default Login;
