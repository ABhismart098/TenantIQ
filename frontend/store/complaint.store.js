let complaintState = {
  complaints: [],
  selectedComplaint: null,
  isLoading: false,
  error: null
};

const listeners = new Set();

export const complaintStore = {
  getState: () => ({ ...complaintState }),

  setState: (updates) => {
    complaintState = { ...complaintState, ...updates };
    listeners.forEach(listener => listener(complaintState));
  },

  setComplaints: (complaints) => {
    complaintStore.setState({ complaints });
  },

  selectComplaint: (complaint) => {
    complaintStore.setState({ selectedComplaint: complaint });
  },

  clearSelection: () => {
    complaintStore.setState({ selectedComplaint: null });
  },

  setLoading: (isLoading) => {
    complaintStore.setState({ isLoading });
  },

  setError: (error) => {
    complaintStore.setState({ error });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default complaintStore;
