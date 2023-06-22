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

  static memoize = (func) => {
    const cache = new Map();

    return function() {
      const key = JSON.stringify(arguments);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, arguments);
      cache.set(key, result);
      return result;
    };
  };

  static curry = (func, arity = func.length) => {
    return function curried(...args) {
      if (args.length >= arity) return func(...args);
      return function(...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    };
  };

  static partial = (func, ...args) => {
    return function partiallyApplies(...moreArgs) {
      return func(...args, ...moreArgs);
    };
  };

  static pipe = (...funcs) => {
    return function piped(...args) {
      return funcs.reduce((result, func) => [func.call(this, ...result)], args)[0];
    }
  };

  static compose = (...funcs) => {
    return function composed(...args) {
      return funcs.reduceRight((result, func) => [func.call(this, ...result)], args)[0];
    }
  };

  static pick = (obj, keys) => {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {})
  };

  static omit = (obj, keys) => {
    return Object.keys(obj)
      .filter(key => !keys.includes(key))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  };

  static zip = (...arrays) => {
    const maxLength = Math.max(...arrays.map(array => array.length));
    return Array.from({ length: maxLength }).map((_, i) => {
      return Array.from({ length: arrays.length }, (_, j) => array[j][i]);
    });
  };

  static chunk = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }
}

export default Utilities;
