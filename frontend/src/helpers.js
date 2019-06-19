const localStorageWrapper = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : value;
  },
};

export { localStorageWrapper };
