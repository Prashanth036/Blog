import { createSlice } from '@reduxjs/toolkit'


let initialState = { userId: '', username: '' }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      // {userId:action.payload.userId,username:action.payload.username}
      //  state.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.userId = ''
      state.username = ''
    }
  }
})

export const { addUser,deleteUser } = usersSlice.actions;

export default usersSlice.reducer;