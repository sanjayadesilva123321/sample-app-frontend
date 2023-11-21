const defaultDataObj = Object.freeze({
  TOAST_ALERT_TYPES: {
    SUCCESS: {
      type: "success",
      cssClass: "success",
      icon: "fi fi-ss-check-circle",
    },
    INFO: {
      type: "info",
      cssClass: "info",
      icon: "fi fi-sr-info",
    },
    WARNING: {
      type: "warning",
      cssClass: "warning",
      icon: "fi fi-ss-triangle-warning",
    },
    ERROR: {
      type: "error",
      cssClass: "danger",
      icon: "fi fi-rr-cross-small",
    },
    OFFLINE: {
      type: "offline",
      cssClass: "dark",
      icon: "fi fi-br-wifi-slash",
      msg: "You are currently offline.",
    },
  },
});

const { TOAST_ALERT_TYPES } = defaultDataObj;

export default defaultDataObj;

export { TOAST_ALERT_TYPES };
