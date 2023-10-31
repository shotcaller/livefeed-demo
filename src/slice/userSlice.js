import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        online: false 
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.online = true;
        },
        logout: (state) => {
            state.name = '';
            state.online = false;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;