import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        name: '',
        userid: '',
        online: false 
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.userid = action.payload.userid;
            state.online = true;
        },
        logout: (state) => {
            state.name = '';
            state.userid = '';
            state.id = '';
            state.online = false;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;