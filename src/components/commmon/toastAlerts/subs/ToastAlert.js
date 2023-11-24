import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

import { TOAST_ALERT_TYPES } from '../../../../helpers/common';

function ToastAlert(props) {
  const { type, delay, alert, hideAlert, dataTestId } = props;

  const [metaData, setMetaData] = useState(TOAST_ALERT_TYPES.SUCCESS);

  useEffect(() => {
    switch (type) {
      case     TOAST_ALERT_TYPES.SUCCESS.type:
        setMetaData(TOAST_ALERT_TYPES.SUCCESS);
        break;
      case TOAST_ALERT_TYPES.INFO.type:
        setMetaData(TOAST_ALERT_TYPES.INFO);
        break;
      case TOAST_ALERT_TYPES.WARNING.type:
        setMetaData(TOAST_ALERT_TYPES.WARNING);
        break;
      case TOAST_ALERT_TYPES.ERROR.type:
        setMetaData(TOAST_ALERT_TYPES.ERROR);
        break;
      default:
        setMetaData(TOAST_ALERT_TYPES.SUCCESS);
    }
  }, [type]);

  return (
    <Toast
      bg={metaData.cssClass}
      show={alert.show}
      onClose={() => hideAlert(alert.id)}
      delay={delay}
      autohide
      key={alert.id}
      data-testid={dataTestId}
    >
      <Toast.Header closeVariant="white" data-testid="component-toast-alert__header">
        <div className="icon">
          <i className={metaData.icon} data-testid="component-toast-alert__icon" />
        </div>
        <p className="mb-0" data-testid="component-toast-alert__message">
          {alert.message}
        </p>
        {alert.body}
      </Toast.Header>
    </Toast>
  );
}

ToastAlert.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    message: PropTypes.node.isRequired,
    body: PropTypes.node,
  }).isRequired,
  hideAlert: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    TOAST_ALERT_TYPES.SUCCESS.type,
    TOAST_ALERT_TYPES.INFO.type,
    TOAST_ALERT_TYPES.WARNING.type,
    TOAST_ALERT_TYPES.ERROR.type,
    TOAST_ALERT_TYPES.OFFLINE.type,
  ]),
  delay: PropTypes.number,
  dataTestId: PropTypes.string,
};

ToastAlert.defaultProps = {
  type: TOAST_ALERT_TYPES.SUCCESS.type,
  delay: 3000,
  dataTestId: 'component-toast-alert',
};

export default ToastAlert;
