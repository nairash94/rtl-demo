import {createSlice} from '@reduxjs/toolkit';

export type ChannelType = 'PL' | 'Fellow';
export type UserDataType = {
  isAuthenticated: boolean;
  language: string;
  email?: string;
};
const initialState: UserDataType = {
  isAuthenticated: false,
  language: 'en',
  email: undefined,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload;
    },
    setUserLang: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {setAuthenticated, setUserLang} = userDataSlice.actions;
export default userDataSlice.reducer;
