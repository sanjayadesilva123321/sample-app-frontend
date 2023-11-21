import PropTypes from 'prop-types';

import { useAuth } from '../AuthProvider';
import Loading from '../../../components/commmon/loading/Loading';
import Unauthorized from '../../../components/auth/unauthorized/Unauthorized';

function AuthorizedWithMessage(props) {
  /**
   * Children components will be rendered when user has required permissions
   * If user doesn't have required permissions, then it will render <AccessDenied /> component
   * ex:
   * <AuthorizedWithMessage requiredPermissions={[authHelper.PERMISSIONS.EMPLOYEE.READ]}>
   *    <Sample>component goes to here</Sample>
   *  </AuthorizedWithMessage>
   *
   * This example will render <Sample /> component if user has
   * this authHelper.PERMISSIONS.EMPLOYEE.READ permission
   * otherwise it will render <AccessDenied /> component
   */

  const { requiredPermissions, message, children } = props;

  const auth = useAuth();

  if (auth.isProcessing) {
    return <Loading />;
  }

  if (auth.hasPermission(requiredPermissions)) {
    return children;
  }

  return <Unauthorized message={message} />;
}

AuthorizedWithMessage.propTypes = {
  requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  message: PropTypes.node,
};

AuthorizedWithMessage.defaultProps = {
  message: '',
};

export default AuthorizedWithMessage;
