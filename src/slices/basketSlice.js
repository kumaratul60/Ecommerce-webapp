import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items]; // copy of basket

      if (index >= 0) {
        // If the items exists in the basket then remove it
        newBasket.splice(index, 1);

        // don't use filter because array the filter array will get read of all of the items with that id
        // or every single items with that id.  you don't want to do that
      } else {
        //console.warn() is used to display the warning messages on the console.
        console.warn(`Can't remove product (id: ${action.payload.id}) `);
      }
      // final login to make every thing is work fine
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull/grab the information from the Global store slice in particular,
//the basket slice of the global store

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
