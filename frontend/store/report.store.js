let reportState = {
  reports: [],
  selectedReport: null,
  isLoading: false,
  error: null
};

const listeners = new Set();

export const reportStore = {
  getState: () => ({ ...reportState }),

  setState: (updates) => {
    reportState = { ...reportState, ...updates };
    listeners.forEach(listener => listener(reportState));
  },

  setReports: (reports) => {
    reportStore.setState({ reports });
  },

  selectReport: (report) => {
    reportStore.setState({ selectedReport: report });
  },

  clearSelection: () => {
    reportStore.setState({ selectedReport: null });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default reportStore;
