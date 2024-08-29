import { configureStore } from "@reduxjs/toolkit";
import {cartSlice} from "./cartSlice";


const store = configureStore({
    reducer:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cart: cartSlice.reducer as any,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;