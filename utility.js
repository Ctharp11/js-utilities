class Utilities {
  static debounce = (func, delay = 300) => {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  };

  static throttle = (func, delay = 300) => {
    let wait = false;

    return (...args) => {
      if (wait) {
        return;
      }

      func(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    };
  };

  static once = () => {};

  static curry = () => {};

  static partial = () => {};

  static pipe = () => {};

  static compose = () => {};

  static pick = () => {};

  static omit = () => {};

  static zip = () => {};
}

export default Utilities;
