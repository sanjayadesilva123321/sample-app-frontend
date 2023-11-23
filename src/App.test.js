import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { getByTestId } from './utils/TestUtils';

import store from './store/store';

const setup = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

describe('Check App render', () => {
  test('Should render app component', () => {
    const wrapper = setup();
    const AppElement = getByTestId(wrapper.container, 'app-1');
    expect(AppElement).toBeInTheDocument();
  });

  test('Should render ToastAlerts-Wrapper component', () => {
    const wrapper = setup();
    const AppElement = getByTestId(wrapper.container, 'component-toast-alerts');
    expect(AppElement).toBeInTheDocument();
  });
});
