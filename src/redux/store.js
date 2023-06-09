import { configureStore } from '@reduxjs/toolkit'
import userDetailsSlice from './slices/userDetailsSlice'


export default configureStore({
    reducer: {
        userDetailsSlice,
    }
})