import { configureStore } from '@reduxjs/toolkit';

let state = {
  value: null,
  connectedState: false,
};

const reducer = (currentState, action) => {
  switch (action.type) {
    case 'IS_CONNECTED':
      return { ...currentState, connectedState: action.payload };
    default:
      return currentState;
  }
};

export const store = configureStore({
  preloadedState: state,
  reducer,
});
