let leadState = {
  leads: [],
  selectedLead: null,
  isLoading: false,
  error: null
};

const listeners = new Set();

export const leadStore = {
  getState: () => ({ ...leadState }),

  setState: (updates) => {
    leadState = { ...leadState, ...updates };
    listeners.forEach(listener => listener(leadState));
  },

  setLeads: (leads) => {
    leadStore.setState({ leads });
  },

  selectLead: (lead) => {
    leadStore.setState({ selectedLead: lead });
  },

  addLead: (lead) => {
    const leads = [...leadState.leads, lead];
    leadStore.setState({ leads });
  },

  updateLead: (id, updates) => {
    const leads = leadState.leads.map(l => l.id === id ? { ...l, ...updates } : l);
    leadStore.setState({ leads });
  },

  deleteLead: (id) => {
    const leads = leadState.leads.filter(l => l.id !== id);
    leadStore.setState({ leads });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default leadStore;
