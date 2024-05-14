import { configureStore } from '@reduxjs/toolkit';

let state = {
  value: null,
  connectedState: false,
};

const reducer = (currentState, action) => {
  switch (action.type) {
    // case 'ADD_PRODUCT':
    //   const listWithNewProduct = [...currentState.list, action.payload];
    //   return { ...currentState, list: listWithNewProduct };
    // case 'REMOVE_PRODUCT':
    //   const list = currentState.list.filter(
    //     (item, index) => index !== action.payload
    //   );
    //   return { ...currentState, list: list };
    // case 'APPLY_VOUCHER':
    //   const withVoucherList = currentState.list.map((item) =>
    //     item.title === 'Super Crémeux'
    //       ? { ...item, price: action.payload.price }
    //       : item
    //   );
    //   return { ...currentState, list: withVoucherList };
    // case 'UPDATE_FIRSTNAME':
    //   const owner = { ...currentState.owner, firstName: action.payload };
    //   return { ...currentState, owner };
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
