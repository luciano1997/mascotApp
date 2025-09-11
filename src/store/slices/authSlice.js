import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState:{
        email:null,
        localId: null,
        isLoggedIn: false,
        image: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setLocalId: (state, action) => {
            state.localId = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        }

    }
})

export const { setEmail, setIsLoggedIn, setLocalId, setImage } = authSlice.actions
export default authSlice.reducer