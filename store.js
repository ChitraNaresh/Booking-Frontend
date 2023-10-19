import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alertReducer";
import { userSlice } from "./userSlice";

const rootReducer={
    alerts:alertSlice.reducer,
    user:userSlice.reducer
}

const store=configureStore({
    reducer:rootReducer
})

export default store