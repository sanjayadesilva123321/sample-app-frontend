import { render } from '@testing-library/react';

import AuthorizedWithMessage from './AuthorizedWithMessage';

import { AuthContext } from '../AuthProvider';

import { checkProps } from '../../../utils/TestUtils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const defaultProps = {
  requiredPermissions: [],
  children: 'Children Text',
};

const defaultContextValues = {
  isProcessing: true,
  hasPermission: jest.fn().mockReturnValue(false),
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };
  return render(
    <AuthContext.Provider value={setupContextValues}>
      <AuthorizedWithMessage {...setupProps} />
    </AuthContext.Provider>,
  );
};

test('validate props types', () => {
  checkProps(AuthorizedWithMessage, defaultProps);
});

describe('while loading', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test('"loading" component should be available', () => {
    expect(wrapper.getByTestId('component-loading')).toBeVisible();
  });
  test('"children" should not be available', () => {
    expect(wrapper.queryByText(defaultProps.children)).not.toBeInTheDocument();
  });
});
describe('has permissions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {},
      {
        isProcessing: false,
        hasPermission: jest.fn().mockReturnValue(true),
      },
    );
  });
  test('"loading" component should not be available', () => {
    expect(wrapper.queryByTestId('component-loading')).not.toBeInTheDocument();
  });
  test('"children" should be available', () => {
    expect(wrapper.getByText(defaultProps.children)).toBeVisible();
  });
});
describe('no permissions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {},
      {
        isProcessing: false,
      },
    );
  });
  test('"loading" component should not be available', () => {
    expect(wrapper.queryByTestId('component-loading')).not.toBeInTheDocument();
  });
  test('"children" should not be available', () => {
    expect(wrapper.queryByText(defaultProps.children)).not.toBeInTheDocument();
  });
});
