import { createSlice } from "@reduxjs/toolkit";


export const alertPopupSlice = createSlice({
  name: 'alertPopup',
  initialState: {
    open: false,
    message: '',
    type: 'success',
    duration: 4000
  },
  reducers: {
    openAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration??4000;
      state.open = true;
    },
    closeAlert: (state) => {
      state.open = false;
      state.message = '';
    }
  }
})

export const { openAlert, closeAlert } = alertPopupSlice.actions;
export default alertPopupSlice.reducer;