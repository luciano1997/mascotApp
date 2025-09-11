import { createSlice } from "@reduxjs/toolkit";

import products from '../../data/products.json'
import categories from '../../data/categories.json'

const shopSlice = createSlice({
    name: "shopApi",
    initialState:{
        categories,
        products,
        categorySelected:0,
        productSelected:{}
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload

        },
        setProductSelected: (state, action) => {
            state.productSelected = action.payload
        }

    }
})

export const { setCategorySelected, setProductSelected } = shopSlice.actions
export default shopSlice.reducer