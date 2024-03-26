import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import { useParams ,useNavigate,Navigate,Link,useLocation} from 'react-router-dom'
import { redirect } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUpdatePostMutation } from '../api/apiSlice';
import { postUpdated } from './postsSlice';
// import { postUpdated, selectPostById } from './postsSlice'



export const EditPostForm = ({dialogs}) => {
    const { postId } = useParams();

    // const [open, setOpen] =useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  let {state}=useLocation();
  //  console.log(currentPost)
  const handleClose = () => {
    setOpen(false);
  };
  const { open, setOpen, userPosts, setUserPosts } = dialogs;

    // const post = useSelector(state =>selectPostById(state,postId));

    const [title, setTitle] = useState()
    const [content, setContent] = useState();
    const [editPost]=useUpdatePostMutation();
    useEffect(()=>{
      if(open){
        setTitle(state.post.title);
        setContent(state.post.content);
      }
    },[open]);

    const dispatch = useDispatch();
    let navigate=useNavigate();
    // const history = useHistory();


    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = (formJson) => {
        if (title && content) {
          console.log({id:postId,...formJson})
         editPost({id:postId,...formJson}).unwrap()
         .then(payload=>{
          console.log(payload);
          setUserPosts(userPosts.map(ele=>{
            if(ele.id===parseInt(postId)){
              return payload.data
            }else{
              return ele
            }
          })) 
          dispatch(postUpdated({id:postId,...formJson}))
          navigate("/posts",{replace:true})
         })
         .then(err=>console.log(err));
        
        }
      }
      return (
      
         
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            onSavePostClicked(formJson);
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <label>Title:
          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="postTitle"
              name="title"
              placeholder="Post Title"
              value={title}
              onChange={onTitleChanged}
          /></label>
          <label>Content:
           <TextField
            autoFocus
            fullWidth
            required
            multiline
            rows={3} 
            margin="dense"
            id="postContent"
            name="content"
            placeholder="Post Content"
            value={content}
            onChange={onContentChanged}
          />
          </label>
        </DialogContent>
        <DialogActions>
        <Link to="/posts" replace>
          <Button onClick={() => setOpen(false)}>Cancel</Button></Link>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
         
      )

}




export const DeletePost=async()=>{
  // const navigate=useNavigate()
  return redirect('/posts')
  //  <Navigate to='/posts'  replace={true} />;
}