import { AuthProvider } from './AuthProvider';

import { checkProps } from '../../utils/TestUtils';

const defaultProps = {
  children: <p>child</p>,
};

test('validate props types', () => {
  checkProps(AuthProvider, defaultProps);
});
