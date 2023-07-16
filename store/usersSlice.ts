import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  user: any;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  user: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserData(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, getUserData } =
  usersSlice.actions;
export default usersSlice.reducer;
