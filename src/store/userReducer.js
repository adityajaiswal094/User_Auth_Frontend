import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    SetUser: (state, action) => {
      const { user } = action.payload;

      return {
        ...state,
        user: user,
      };
    },

    Logout: (state) => {
      return initialState;
    },
  },
});

export const {SetUser, Logout } = userSlice.actions;
export default userSlice.reducer;
