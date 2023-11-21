import responseCodes from '../../helpers/responseCodes';
import * as commonActions from '../actions/common';

import store from '../store';

/* -------------------------------------------------------------------------- */
/*                                   Alerts                                   */
/* -------------------------------------------------------------------------- */
export const showErrorAlert = (message = responseCodes.ERROR.INTERNAL_SERVER_ERROR.MSG) => {
  store.dispatch(commonActions.showErrorAlert({ message }));
};

export const showSuccessAlert = message => {
  store.dispatch(commonActions.showSuccessAlert({ message }));
};
