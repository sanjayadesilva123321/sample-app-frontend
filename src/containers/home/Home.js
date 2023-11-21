import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useAuth } from '../auth/AuthProvider';

import AuthorizedWithMessage from '../auth/authorizationWrappers/AuthorizedWithMessage';

import { ROLES } from '../../helpers/auth';
import { HOME } from '../../helpers/home/home';
import { routes } from '../../helpers/routes';

import * as userSelector from '../../store/selectores/user';

function Home() {
  const { signOut } = useAuth();
  const userName = useSelector(userSelector.userName);

  const signOutUser = async () => {
    signOut();
  };

  return (
    <div data-testid="home" className="home-wrapper">
      <AuthorizedWithMessage requiredPermissions={[ROLES.User, ROLES.Manager, ROLES.Admin]}>
        <section>
          <h2>{HOME.HOME}</h2>
          <p>{`${HOME.YOU_ARE_LOGGED_IN} ${userName}`}</p>
          <br />
          <Link to={routes.AUTHENTICATED.EDITOR.FULL_PATH}>{HOME.EDITORS_PAGE}</Link>
          <br />
          <div className="flexGrow">
            <Button onClick={signOutUser} variant="light" data-testid="home-sign-out">
              {HOME.SIGNOUT}
            </Button>
          </div>
        </section>
      </AuthorizedWithMessage>
    </div>
  );
}

export default Home;
