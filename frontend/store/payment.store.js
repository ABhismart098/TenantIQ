let paymentState = {
  payments: [],
  selectedPayment: null,
  isLoading: false,
  error: null
};

const listeners = new Set();

export const paymentStore = {
  getState: () => ({ ...paymentState }),

  setState: (updates) => {
    paymentState = { ...paymentState, ...updates };
    listeners.forEach(listener => listener(paymentState));
  },

  setPayments: (payments) => {
    paymentStore.setState({ payments });
  },

  selectPayment: (payment) => {
    paymentStore.setState({ selectedPayment: payment });
  },

  addPayment: (payment) => {
    const payments = [...paymentState.payments, payment];
    paymentStore.setState({ payments });
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export default paymentStore;
