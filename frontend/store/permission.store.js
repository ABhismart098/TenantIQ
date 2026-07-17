let permissionState = {
  permissions: [],
  isLoading: false,
  error: null
};

const listeners = new Set();

export const permissionStore = {
  getState: () => ({ ...permissionState }),

  setState: (updates) => {
    permissionState = { ...permissionState, ...updates };
    listeners.forEach(listener => listener(permissionState));
  },

  setPermissions: (permissions) => {
    permissionStore.setState({ permissions });
  },

  hasPermission: (action, resource) => {
    return permissionState.permissions.some(p => p.action === action && p.resource === resource);
  },

  canAccess: (resource) => {
    return permissionState.permissions.some(p => p.resource === resource);
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default permissionStore;
