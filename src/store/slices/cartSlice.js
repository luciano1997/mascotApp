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
            const { product, quantity } = action.payload;
            const productInCart = state.cartItems.find(item => item.id === product.id);
            if (!productInCart && quantity > 0) {
                state.cartItems.push({ ...product, quantity });
            } else if (productInCart) {
                productInCart.quantity += quantity;
                if (productInCart.quantity <= 0) {
                    // Eliminar producto si la cantidad llega a 0
                    state.cartItems = state.cartItems.filter(item => item.id !== product.id);
                }
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.total = 0;
            console.log("clearCart",state)
            
            state.updatedAt = new Date().toLocaleString();
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer