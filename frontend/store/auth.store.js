let authState = {
  user: null,
  token: null,
  isAuthenticated: false
};

const listeners = new Set();

export const authStore = {
  getState: () => ({ ...authState }),

  setState: (updates) => {
    authState = { ...authState, ...updates };
    listeners.forEach(listener => listener(authState));
  },

  setUser: (user) => {
    authStore.setState({ user, isAuthenticated: !!user });
  },

  setToken: (token) => {
    authStore.setState({ token });
  },

  login: (user, token) => {
    authStore.setState({ user, token, isAuthenticated: true });
  },

  logout: () => {
    authStore.setState({ user: null, token: null, isAuthenticated: false });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default authStore;
