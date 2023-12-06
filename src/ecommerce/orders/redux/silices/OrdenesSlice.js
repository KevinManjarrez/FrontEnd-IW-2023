import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //DATA
ordenesDataArr: [],
 
  //SELECCIONES
  //instituteDataObj: {},
    //BOOLEANS/VARIABLES
}
const OrdenesSlice = createSlice({
name: 'ORDENES',
initialState,
reducers: {
SET_DATA_ORDENES: (state, action) => {
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_ORDENES>>', action.payload);
//state.institutesDataArr = action.payload.institutesDataArr;
state.ordenesDataArr = action.payload
}
    }
}
);
export const {
SET_DATA_ORDENES,
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = OrdenesSlice.actions;
export default OrdenesSlice.reducer;