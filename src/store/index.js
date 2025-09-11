import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import {shopApi } from '../services/shopApi'
import { authApi } from '../services/authApi'


export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
   middleware: (getDefaultMiddleware)=>(getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware))
})

setupListeners(store.dispatch)