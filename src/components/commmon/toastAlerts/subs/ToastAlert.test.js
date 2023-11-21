import { render, screen, fireEvent } from "@testing-library/react";

import ToastAlert from "./ToastAlert";
import { checkProps } from "../../../../utils/TestUtils";
import { TOAST_ALERT_TYPES } from "../../../../helpers/common";

const defaultProps = {
  alert: {
    id: "randomId",
    show: true,
    message: "test message",
    body: <p>test body</p>,
  },
  type: TOAST_ALERT_TYPES.SUCCESS.type,
  delay: 5000,
  hideAlert: jest.fn(),
};

/**
 * This function will render component by merging given props
 * @param {object} props component props
 * @returns {ReactWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  render(<ToastAlert {...setupProps} />);
};

test("validate props types", () => {
  checkProps(ToastAlert, defaultProps);
});

describe("default component rendering tests", () => {
  test('"component-toast-alert" should be available', () => {
    setup();
    const component = screen.getByTestId("component-toast-alert");
    expect(component).toBeInTheDocument();
  });
  test('"header" should be available', () => {
    setup();
    const headerComponent = screen.getByTestId("component-toast-alert__header");
    expect(headerComponent).toBeInTheDocument();
  });
  describe('when type is "success"', () => {
    test("background class is correct", () => {
      setup();
      const component = screen.getByTestId("component-toast-alert");
      expect(component).toHaveClass("bg-success");
    });
    test("background class is correct default type", () => {
      setup({ ...defaultProps, type: TOAST_ALERT_TYPES.OFFLINE.type });
      const component = screen.getByTestId("component-toast-alert");
      expect(component).toHaveClass("bg-success");
    });
    test('"icon" click close', () => {
      const hideAlertMock = jest.fn(); // Mock the hideAlert function
      const defaultProps = {
        alert: {
          id: "1",
          show: true,
          message: "Test Message",
          body: "Test Body",
        },
        type: "success", // Update with your desired type
        delay: 3000,
        dataTestId: "component-toast-alerts__alert", // Corrected dataTestId
        hideAlert: hideAlertMock, // Use the mock function
      };

      setup({ ...defaultProps, defaultProps });
      const iconComponent = screen.getByRole("button", { name: /close/i });
      fireEvent.click(iconComponent);
      // Assertions for calling hideAlertMock with the correct arguments
      expect(hideAlertMock).toHaveBeenCalledWith(defaultProps.alert.id);
    });
    test('"icon" is correct', () => {
      setup();
      const iconComponent = screen.getByTestId("component-toast-alert__icon");
      expect(iconComponent).toHaveClass(TOAST_ALERT_TYPES.SUCCESS.icon);
    });
    test('"message" is correct', () => {
      setup();
      const messageComponent = screen.getByTestId(
        "component-toast-alert__message"
      );
      expect(messageComponent).toHaveTextContent(defaultProps.alert.message);
    });
  });
  describe('when type is "info"', () => {
    test("background class is correct", () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.INFO.type,
      });
      const component = screen.getByTestId("component-toast-alert");
      expect(component).toHaveClass("bg-info");
    });
    test('"icon" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.INFO.type,
      });
      const iconComponent = screen.getByTestId("component-toast-alert__icon");
      expect(iconComponent).toHaveClass(TOAST_ALERT_TYPES.INFO.icon);
    });
    test('"message" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.INFO.type,
      });
      const messageComponent = screen.getByTestId(
        "component-toast-alert__message"
      );
      expect(messageComponent).toHaveTextContent(defaultProps.alert.message);
    });
  });
  describe('when type is "warning"', () => {
    test("background class is correct", () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.WARNING.type,
      });
      const component = screen.getByTestId("component-toast-alert");
      expect(component).toHaveClass("bg-warning");
    });
    test('"icon" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.WARNING.type,
      });
      const iconComponent = screen.getByTestId("component-toast-alert__icon");
      expect(iconComponent).toHaveClass(TOAST_ALERT_TYPES.WARNING.icon);
    });
    test('"message" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.WARNING.type,
      });
      const messageComponent = screen.getByTestId(
        "component-toast-alert__message"
      );
      expect(messageComponent).toHaveTextContent(defaultProps.alert.message);
    });
  });
  describe('when type is "error"', () => {
    test("background class is correct", () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.ERROR.type,
      });
      const component = screen.getByTestId("component-toast-alert");
      expect(component).toHaveClass("bg-danger");
    });
    test('"icon" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.ERROR.type,
      });
      const iconComponent = screen.getByTestId("component-toast-alert__icon");
      expect(iconComponent).toHaveClass(TOAST_ALERT_TYPES.ERROR.icon);
    });
    test('"message" is correct', () => {
      setup({
        ...defaultProps,
        type: TOAST_ALERT_TYPES.ERROR.type,
      });
      const messageComponent = screen.getByTestId(
        "component-toast-alert__message"
      );
      expect(messageComponent).toHaveTextContent(defaultProps.alert.message);
    });
  });
});
