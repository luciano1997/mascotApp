import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import shopReducer from './slices/shopSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import {shopApi } from '../services/shopApi'
import { authApi } from '../services/authApi'
import { userProfileApi } from '../services/userProfileApi'
import { orderApi } from '../services/ordersApi'


export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    authReducer,
    orderReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    
  },
   middleware: (getDefaultMiddleware)=>(getDefaultMiddleware({immutableCheck: false}).concat(shopApi.middleware).concat(authApi.middleware).concat(userProfileApi.middleware).concat(orderApi.middleware))
})

setupListeners(store.dispatch)