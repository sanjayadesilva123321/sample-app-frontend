import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../AuthProvider';

import { USER } from '../../../helpers/auth';
import { LOGIN } from '../../../helpers/login/login';
import { routes } from '../../../helpers/routes';

function Login() {
  const initialValues = {
    username: '',
    password: '',
  };
  const { loginUserFlow } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required(USER.USER_NAME_REQUIRED),
    password: Yup.string().required(USER.PASSWORD_REQUIRED),
  });

  const onSubmit = async (values, { resetForm }) => {
    const user = values.username;
    const pwd = values.password;
    loginUserFlow(user, pwd);
    resetForm();
  };

  return (
    <div className="App" data-testid="login">
      <section>
        <h2>{LOGIN.SIGNIN}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">{LOGIN.USERNAME}</label>
              <Field type="text" id="username" name="username" className="fieldWrapper" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">{LOGIN.PASSWORD}</label>
              <Field type="password" id="password" name="password" className="fieldWrapper" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <Button type="submit" variant="light" data-testid="login-signin_button">
              {LOGIN.SIGNIN}
            </Button>
          </Form>
        </Formik>
        <p>
          {LOGIN.NEED_AN_ACCOUNT}
          <br />
          <span className="line" data-testid="login-signup_span">
            <Link to={routes.UN_AUTHENTICATED.REGISTER.FULL_PATH}>{LOGIN.SIGNUP}</Link>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Login;
