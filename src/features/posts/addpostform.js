import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addPost, postAdded } from './postsSlice'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useAddPostMutation } from '../api/apiSlice';


export const AddPostForm = ({ userPost }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');
  const [postContent, setPostContent] = useState('');


  const [postUpdate, {data,isSuccess,isLoading}
  ] = useAddPostMutation();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);


  const { userPosts, setUserPosts } = userPost

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)


  let canSave = Boolean(title) && Boolean(content);
  

  const onSavePostClicked = async () => {
    canSave = false
    if (title && content) {


      await postUpdate({
        title: title,
        content: content
      }).unwrap().then(async (payload) => {
        console.log('fulfilled', payload);
        if (payload) {
         
          if (userPosts!==undefined) {

            setUserPosts([
              ...userPosts,
              payload.data
            ])
            // setUserPostList(payload.data)
          }
         
        
            dispatch(
              // addPost(payload.data)
             postAdded(payload.data)
            )
        
          setTitle('')
          setContent('')
        }
      })

        .catch((error) => console.error('rejected', error))
    }



  }

  /*  const usersOptions = users.map(user => (
     <option key={user.id} value={user.id} >{user.name}</option>
   )); */

  return (
    

      <Box  
        sx={{
          width: 500,
          maxWidth: '100%',
          marginTop: 2,
          marginLeft: 15,
          marginBottom: -3
        }}
      >
         {/* <h2>Add a New Post</h2> */}
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            marginLeft: 10
          }}
        >
          <label htmlFor="postTitle">Post Title:
            <TextField fullWidth  size="small" 
              value={title}
              onChange={onTitleChanged}
            /></label>
          <label htmlFor="postTitle">Content:
            <TextField fullWidth  multiline
              value={content}
              onChange={onContentChanged}
              rows={4} size="small" /></label>
          <Button sx={{ marginTop: 2 }} variant="contained" size="small"
            disabled={!canSave} onClick={onSavePostClicked}
          >Post</Button>

          {/* <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button> */}

        </Box>
      </Box>
    
  )
}