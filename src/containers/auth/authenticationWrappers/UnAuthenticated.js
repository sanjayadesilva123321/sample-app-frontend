import PropTypes from "prop-types";

import { useAuth } from "../AuthProvider";
import Loading from "../../../components/commmon/loading/Loading";

function UnAuthenticated(props) {
  /**
   * Children components will be rendered when user is
   * not SSO authenticated and not backend authorized
   */

  const { children } = props;
  const auth = useAuth();

  if (!auth.isBackendAuthorized) {
    if (auth.isProcessing) {
      return <Loading />;
    }

    return children;
  }

  return null;
}

UnAuthenticated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnAuthenticated;
