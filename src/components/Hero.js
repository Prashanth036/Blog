// import * as React from 'react';
import React from 'react'
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Testimonials from './post';
import { useSelector,useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
import { addUser } from '../features/users/usersSlice';
import { useGetPostsQuery } from '../features/api/apiSlice';
import { getPost, selectAllPosts } from '../features/posts/postsSlice';
import { Spinner } from './Spinner';
import { isUnitless } from '@mui/material/styles/cssUtils';


export default function Hero() {

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery(); 
  const [complete,setComplete]=React.useState(false);
  const dispatch = useDispatch();
  const posts1 = useSelector(selectAllPosts);
  
   React.useEffect(()=>{
    if(posts1.length===0 && isSuccess){
      

    dispatch(
        getPost(posts.data)
    )
    setComplete(!complete)
    }
   },[isSuccess]);
  // const useGetPostById=useGetPostsQuery();

  let content

  if(isLoading){
    content=<Spinner text='Loading.....' />
  }else if(isSuccess){
    content=<Testimonials  useGetPostById={posts.data}/>
  }

 
  return (
    
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {/* <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}> */}
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Explore latest&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
             Posts
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
          The post page serves as a hub for accessing and exploring a collection of articles or entries, offering a platform for users to delve into specific topics and discover valuable insights and information
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
        
            </Stack>
        {/* </Stack> */}
       {/* {isSuccess&& <Testimonials  useGetPostById={posts}/>} */}
       {content}
      </Container>
  );
}