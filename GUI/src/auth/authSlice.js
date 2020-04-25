const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        showAuthModal: {
            type: 'login',
            show: false
        },
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setShowAuthModal: (state, action) => {
            if(!action.payload.type){
                state.showAuthModal.show = action.payload;
            }else{
                state.showAuthModal = action.payload
            }
        },
    },
});

export const { setIsLoggedIn, setIsAdmin, setShowAuthModal } = authSlice.actions;

export default authSlice.reducer;