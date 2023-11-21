import PropTypes from 'prop-types';

import { useAuth } from '../AuthProvider';
import Loading from '../../../components/commmon/loading/Loading';

function Authenticated(props) {
  /**
   * Children components will be rendered only for backend authorized user
   */
  const { children } = props;

  const auth = useAuth();
  if (auth.isBackendAuthorized) {
    if (auth.isProcessing) {
      return <Loading />;
    }
    return children;
  }

  return null;
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authenticated;
