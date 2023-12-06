import { configureStore } from "@reduxjs/toolkit";
import OrdenesSlice from "../silices/OrdenesSlice";
//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      ordenesReducer: OrdenesSlice,
      //productosSliceReducer: productosSlice,
    },
  });
 
  export default store;