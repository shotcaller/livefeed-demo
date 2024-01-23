import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import alertPopupSlice from "../slice/alertPopupSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        alertPopup : alertPopupSlice
    }
})