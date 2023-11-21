import { useSelector, useDispatch } from 'react-redux';
import ToastContainer from 'react-bootstrap/ToastContainer';

import ToastAlert from './subs/ToastAlert';
import * as commonActions from '../../../store/actions/common';
import * as commonSelector from '../../../store/selectores/common';

function ToastAlerts() {
  /**
   * This component can be used to show following type alerts
   * success | info | warning | error
   *
   * For rendering these type of alerts there are couple of redux actions creators available
   * dispatch(showSuccessAlert({message: '', body: <jsx/>, delay: 5000}))
   * dispatch(showInfoAlert({message: '', body: <jsx/>, delay: 5000}))
   * dispatch(showWarningAlert({message: '', body: <jsx/>, delay: 5000}))
   * dispatch(showErrorAlert({message: '', body: <jsx/>, delay: 5000}))
   * dispatch(showToastAlert({
   *   type: success | info | warning | error,
   *   message: '',
   *   body: <jsx/>,
   *   delay: 5000
   * }))
   */

  const toastAlerts = useSelector(commonSelector.toastAlerts);

  const dispatch = useDispatch();
  const hideAlert = id => dispatch(commonActions.hideToastAlert(id));

  return (
    <ToastContainer position="bottom-end" data-testid="component-toast-alerts">
      {toastAlerts?.map(alert => (
        <ToastAlert
          type={alert.type}
          delay={alert.delay}
          alert={alert}
          hideAlert={hideAlert}
          key={alert.id}
          dataTestId="component-toast-alerts__alert"
        />
      ))}
    </ToastContainer>
  );
}
export default ToastAlerts;
