import {createSlice} from '@reduxjs/toolkit';

export type ChannelType = 'PL' | 'Fellow';
export type UserDataType = {
  isAuthenticated: boolean;
  language: string;
};
const initialState: UserDataType = {
  isAuthenticated: false,
  language: 'en',
};

const userDataSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthenticated: state => {
      state.isAuthenticated = true;
    },
    setUserLang: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {setAuthenticated, setUserLang} = userDataSlice.actions;
export default userDataSlice.reducer;
