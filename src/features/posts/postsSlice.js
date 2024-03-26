import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { useGetPostsByUserQuery, useGetPostsQuery } from '../api/apiSlice';


const reactionEmoji = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState=[];

export const addPost=createAsyncThunk(async(payload)=>{
  console.log(payload)

  const response= await payload;
  console.log(response);
  return response
});
 

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost(state, action){
    
      return [...action.payload]
    },
    postAdded(state, action) {
      console.log(action.payload)
      state.push(action.payload)
    }
    ,
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title,
          existingPost.content = content
      }
    },
    postReactionAdded(state, action) {
      const { postId, name } = action.payload
      // console.log(action.payload)
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
          existingPost.reaction[name]++
      }
    },
    
  },
  extraReducers:(builder)=>{
    builder.addCase(addPost.fulfilled,(state,action)=>{
      console.log(action.payload );
      state.push(action.payload)
    })
  }
})


export const create = (id) => {
  return async (dispatch, getState) => {
       const currentState= getState().posts;
      console.log(currentState) 
  };
};


export const { postAdded, postUpdated, postReactionAdded,getPost } = postsSlice.actions;


export default postsSlice.reducer

 export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId) 