import { configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
// import wishlistReducer from "./wishlist"
const store = configureStore({
    reducer:{
        cart: cartReducer,
        // wishlist: wishlistReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;