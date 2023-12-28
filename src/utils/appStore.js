import { configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { pokemonApi } from "./pokemon";

const appStore = configureStore({
  //big reducer for the app and consists of reducers from Slices
  reducer: {
    cart: cartReducer,
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default appStore;
