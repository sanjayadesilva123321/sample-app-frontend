import { render } from '@testing-library/react';

import UnAuthenticated from './UnAuthenticated';

import { AuthContext } from '../AuthProvider';

import { checkProps } from '../../../utils/TestUtils';

const defaultProps = {
  children: 'Children Text',
};

const defaultContextValues = {
  isProcessing: true,
  isBackendAuthorized: false,
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };
  return render(
    <AuthContext.Provider value={setupContextValues}>
      <UnAuthenticated {...setupProps} />
    </AuthContext.Provider>,
  );
};

test('validate props types', () => {
  checkProps(UnAuthenticated, defaultProps);
});

describe('isBackendAuthorized = false', () => {
  describe('isProcessing = true', () => {
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
  describe('isProcessing = false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isProcessing: false });
    });
    test('"loading" component should not be available', () => {
      expect(wrapper.queryByTestId('component-loading')).not.toBeInTheDocument();
    });
    test('"children" should be available', () => {
      expect(wrapper.getByText(defaultProps.children)).toBeVisible();
    });
  });
});

describe('isBackendAuthorized = true', () => {
  describe('isProcessing = true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isProcessing: true, isBackendAuthorized: true });
    });
    test('"children" should not be available', () => {
      expect(wrapper.queryByText(defaultProps.children)).not.toBeInTheDocument();
    });
  });

  describe('isProcessing = false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isProcessing: false, isBackendAuthorized: true });
    });
    test('"children" should not be available', () => {
      expect(wrapper.queryByText(defaultProps.children)).not.toBeInTheDocument();
    });
  });
});
