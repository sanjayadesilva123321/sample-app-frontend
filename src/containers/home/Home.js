import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as userSelector from "../../store/selectores/user";
import { useAuth } from "../auth/AuthProvider";
import { ROLES } from "../../helpers/auth";
import AuthorizedWithMessage from "../auth/authorizationWrappers/AuthorizedWithMessage";

const Home = () => {
  const { signOut } = useAuth();
  const userName = useSelector(userSelector.userName);

  const signOutUser = async () => {
    signOut();
  };

  return (
    <div data-testid="component-home" className="home-wrapper">
      <AuthorizedWithMessage
        requiredPermissions={[ROLES.User, ROLES.Manager, ROLES.Admin]}
      >
        <section>
          <h2>Home</h2>
          <p>{`You are logged in! - ${userName}`}</p>
          <br />
          <Link to="/editor">Go to the Editors page</Link>
          <br />
          <div className="flexGrow">
            <Button
              onClick={signOutUser}
              variant="light"
              data-testid="sign-out-button"
            >
              Sign Out
            </Button>
          </div>
        </section>
      </AuthorizedWithMessage>
    </div>
  );
};

export default Home;
