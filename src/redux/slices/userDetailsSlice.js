import { createSlice } from "@reduxjs/toolkit";


const userDetailsSlice = createSlice({
    name: 'userDetailsSlice',
    initialState: {
        userDetails: {}
    },

    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },

})

export default userDetailsSlice.reducer;
export const { setUserDetails } = userDetailsSlice.actions;