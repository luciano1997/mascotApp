import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        user: "Demo",
        updatedAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0
    }, reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload
            console.log("Añadiendo producto al carrito: ", product, quantity)
            const productInCart = state.cartItems.find(item => item.id === product.id)
            if (!productInCart) {
                state.cartItems.push({ ...product, quantity })
            } else {
                productInCart.quantity += 1
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload
            console.log("Eliminando producto del carrito: ", productId)
            const productIndex = state.cartItems.findIndex(item => item.id === productId)
            if (productIndex !== -1) {
                state.cartItems.splice(productIndex, 1)
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer