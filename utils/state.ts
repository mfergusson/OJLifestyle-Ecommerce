import { useState, useMemo } from 'react'

export const useAppState = () => {
  const initialState = {
    items: [],
    subTotalPrice: 0,
  }

  const [state, setState] = useState(initialState)
  const actions = useMemo(() => getActions(setState), [setState])

  return { state, actions }
}

const getActions = (setState) => ({
  addItem: ({ id, price, quantity, name }) => {
    setState((state) => {
      const items = [...state.items];
      let subTotalPrice = state.subTotalPrice;
      const item = items.find((item) => item.id === id);

      if (item) {
        item.quantity += quantity;
        subTotalPrice += (price * quantity);

        return {
          ...state,
          items,
          subTotalPrice,
        }
      }

      items.push({ id, price, quantity, name });
      subTotalPrice += (price * quantity);

      return {
        ...state,
        items,
        subTotalPrice,
      }
    })
  },
  removeItem: (price, itemToRemove) => {
    setState((state) => {
      const items = [...state.items];
      let subTotalPrice = state.subTotalPrice;

      subTotalPrice -= price;
      items.splice(itemToRemove, 1);

      return {
        ...state,
        items,
        subTotalPrice,
      }
    })
  },
  decreaseItemQuantity: (itemIterator, amount = 1) => {
    setState((state) => {
      const items = [...state.items];
      let subTotalPrice = state.subTotalPrice;

      items[itemIterator].quantity -= amount;
      subTotalPrice -= items[itemIterator].price;

      return {
        ...state,
        items,
        subTotalPrice,
      }
    })
  },
});