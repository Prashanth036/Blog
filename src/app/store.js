import { configureStore,createAsyncThunk } from '@reduxjs/toolkit'
import postsSlice from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'
import { apiSlice } from '../features/api/apiSlice'
// import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

export const store = configureStore({
  reducer:{
    posts:postsSlice,
    users:usersSlice,
    [apiSlice.reducerPath]:apiSlice.reducer,
    
  },
  middleware:  (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
//  middleware: applyMiddleware(thunk)
})
