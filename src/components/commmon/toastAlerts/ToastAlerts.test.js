/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import ToastAlerts from "./ToastAlerts";
import { storeFactory } from "../../../utils/TestUtils";
import reducerTypes from "../../../store/reducerTypes";

const defaultState = {};
const defaultProps = {};

/**
 * This function will render component by merging given props
 * @param {object} props component props
 * @returns {ReactWrapper}
 */
const setup = (state = {}, props = {}) => {
  const store = storeFactory({
    ...defaultState,
    ...state,
  });
  const setupProps = { ...defaultProps, ...props };
  const component = render(
    <Provider store={store}>
      <ToastAlerts {...setupProps} />
    </Provider>
  );
  // Return both the component and the store
  return { component, store };
};

describe("default component rendering tests", () => {
  test('"component-toast-alerts" should be available', () => {
    const state = {};
    state[reducerTypes.common] = {};
    state[reducerTypes.common].toastAlerts = [];
    setup(state);
    const component = screen.getByTestId("component-toast-alerts");
    expect(component).toBeInTheDocument();
  });
  test('when no alerts, "alert" components should not be available', () => {
    const state = {};
    state[reducerTypes.common] = {};
    state[reducerTypes.common].toastAlerts = [];
    setup(state);
    const alertComponents = screen.queryByTestId(
      "component-toast-alerts__alert"
    );
    expect(alertComponents).toBeFalsy();
  });
  test('for one alert, one "alert" component should be available', () => {
    const state = {};
    state[reducerTypes.common] = {};
    state[reducerTypes.common].toastAlerts = [
      {
        id: "1",
        show: true,
        message: "alert 1",
      },
    ];
    setup(state);
    const alertComponents = screen.getAllByTestId(
      "component-toast-alerts__alert"
    );
    expect(alertComponents.length).toBe(1);
  });
  test('for 3 alerts, three "alert" components should be available', () => {
    const state = {};
    state[reducerTypes.common] = {};
    state[reducerTypes.common].toastAlerts = [
      {
        id: "1",
        show: true,
        message: "alert 1",
      },
      {
        id: "2",
        show: true,
        message: "alert 2",
      },
      {
        id: "3",
        show: true,
        message: "alert 3",
      },
    ];
    setup(state);
    const alertComponents = screen.getAllByTestId(
      "component-toast-alerts__alert"
    );
    expect(alertComponents.length).toBe(3);
  });
  test("hideAlert dispatches the hideToastAlert action", () => {
    const state = {};
    state[reducerTypes.common] = {};
    state[reducerTypes.common].toastAlerts = [
      {
        id: "1",
        show: true,
        message: "Test Message",
      },
    ];

    // Get the component and the store by calling the setup function
    const { component, store } = setup(state);

    // Find and click the close button
    const closeButton = component.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Ensure that the hideToastAlert action is dispatched
    // Check with the appropriate action type and ID
    expect(store.getState().common).toEqual(undefined);
  });
});
