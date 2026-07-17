let userState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null
};

const listeners = new Set();

export const userStore = {
  getState: () => ({ ...userState }),

  setState: (updates) => {
    userState = { ...userState, ...updates };
    listeners.forEach(listener => listener(userState));
  },

  setUsers: (users) => {
    userStore.setState({ users });
  },

  selectUser: (user) => {
    userStore.setState({ selectedUser: user });
  },

  addUser: (user) => {
    const users = [...userState.users, user];
    userStore.setState({ users });
  },

  updateUser: (id, updates) => {
    const users = userState.users.map(u => u.user_id === id ? { ...u, ...updates } : u);
    userStore.setState({ users });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default userStore;
