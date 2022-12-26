import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import { Provider } from "react-redux"
import globalReducer from 'adminState'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
const { api } = require('../adminState/api')



export const store = configureStore({
    reducer:{
        auth: authReducer,
        cart: cartReducer,
        global: globalReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})

setupListeners(store.dispatch)