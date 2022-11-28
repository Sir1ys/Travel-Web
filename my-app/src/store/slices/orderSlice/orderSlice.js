import { createSlice } from '@reduxjs/toolkit';
 
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: [],
        isDone: false
    },
    reducers: {
        addOrder(state, action) {
            const eventIndex = state.order.findIndex(
                (orderEvent) => orderEvent.id === action.payload.id
              );
          
              if (eventIndex < 0) {
                const newEvent = {
                  ...action.payload,
                  quantity: 1,
                };
                state.order.push(newEvent);
              } else {
                state.order = state.order.map((orderItem, index) => {
                  if (index === eventIndex) {
                    return {
                      ...orderItem,
                      quantity: orderItem.quantity + 1,
                    };
                  } else {
                    return orderItem;
                  }
                });
              }
        },
        removeOrder(state, action) {
          const selectedOrder = state.order.find((item) => item.id === action.payload);
          if (selectedOrder.quantity > 1) {
            state.order = state.order.map((item) =>
            item.id !== action.payload ? item : { ...item, quantity: item.quantity - 1 }
            )
          } else {
            state.order = state.order.filter((item) => item.id !== action.payload);
          }
        },
        clearOrder(state) {
          state.order = [];
        },
        orderIsDone(state, action) {
          state.isDone = action.payload;
        }
    }
})

export const {addOrder, removeOrder, clearOrder, orderIsDone} = orderSlice.actions;
export default orderSlice.reducer;