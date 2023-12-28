import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    //action: reducer function
    //reducer function gets access to the state of the store and actions and that's what we've passed as params
    addItem: (state, action) => {
        //we're direclty modifying the state here
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop;
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

//we export both actions and reducer from here

//createSlice returns an Object which has actions and reducers and that's why we've exported it like below

// cartSlice => {
//    actions: {addItem},
//    reducer: ...
// }


export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
