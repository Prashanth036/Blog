
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PostAuthor } from './postauthor';
import { TimeAgo } from './timeago';
import { ReactionButtons } from './reactionbuttons';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';


// import { selectAllPosts } from './postsSlice';
import { useGetPostsByUserQuery, useGetPostsQuery } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';
import { AddPostForm } from './addpostform';
import { useEffect, useState } from 'react';
import ResponsiveDialog from './deleteDialog';
import { EditPostForm } from './editpostform';



let PostExcerpt = ({ post, userLists }) => {
  const { userPosts, setUserPosts } = userLists;
  const [open, setOpen] = useState(false);
  const [dialogState,setDailogState]=useState(false);
  let navigate = useNavigate();


  function handleDelete() {
    setOpen(!open);
    setDailogState(true);
    navigate(`/posts/${post.id}/delete`, { shallow: true })
  }

  function handleEdit(){
    setOpen(!open);
    setDailogState(false)
    navigate(`/posts/${post.id}/edit`, { shallow: true , state: { post: post } })
  }

  return (
    <>
     {dialogState? <ResponsiveDialog dialogs={{ open, setOpen, userPosts, setUserPosts }} />:''}
     {dialogState?"": <EditPostForm dialogs={{ open, setOpen, userPosts, setUserPosts }} />}
      <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            //   alignItems:"center",
            flexGrow: 1,
            p: 1,
          }}
        >
          {/* <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            > */}


          <CardHeader
            title={<>{post.title.replace(/^./, str => str.toUpperCase())}
              {/* <Link to={`/posts/${post.id}/delete`} > */}
              <Button sx={{
                ml: 1,
                color: 'red',
                // backgroundColor:'red'
              }} size='small'
                onClick={handleDelete}
                startIcon={<DeleteIcon />}>
              </Button>
              {/* </Link> */}
              <Button sx={{
                ml: -4,
                backgroundColor: 'none'
              }} size='small' onClick={handleEdit} endIcon={<EditIcon />}>

              </Button></>
            }
            subheaderTypographyProps={{
              sx: {
                padding: '10px',
                /*  color: (theme) =>
                   theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
               }} */
              }
            }}
            subheader={<>
              <PostAuthor userId={post.username} />
              <TimeAgo timestamp={post.createdAt} /></>}
          />
          {/* </Typography> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardHeader
            titleTypographyProps={{}}
            title={<ReactionButtons post={post} userLists={{ userPosts, setUserPosts }} />}
          />
          {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                pr: 2,
              }}
            > */}

          {/*  <img
                src={logos[index]}
                alt={`Logo ${index + 1}`}
                style={logoStyle}
              /> */}
          {/* </Box> */}
        </Card>
      </Grid>
    </>
  )
}


export const PostsList = ({ userLists }) => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch
  } = useGetPostsByUserQuery({
    // pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    // skip: false,
  });
  // console.log(posts)
  const { userPosts, setUserPosts } = userLists;
  const [status, setStatus] = useState(false);
  // console.log(userPosts);

  useEffect(() => {
    refetch
    if (isSuccess && userPosts === undefined) {
      console.log(posts) 
      
      setUserPosts(posts.data);
      setStatus(!status);
    }
  }, [isFetching])
  /*   function fetches(){
      if (posts&&userPosts===undefined) {
        console.log(posts)
        setUserPosts(posts.data);
        setStatus(!status);
      }
    }
    fetches() */
  let content

  if (isLoading) {
    content = <Spinner text='Loading.....' />
  } else if (status) {
    const orderedPosts = userPosts.slice().sort((a, b) => b.createdAt.localeCompare(a.date))
    // console.log(orderedPosts)
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} userLists={{ userPosts, setUserPosts }} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }





  return (
    <>
      <Container
        id="testimonials"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Grid container direction="column"
          justifyContent="center"
          //   alignItems="center"
          spacing={1}>
          <AddPostForm userPost={{ userPosts, setUserPosts }} />
        </Grid>
        <Grid container direction="column"
          justifyContent="center"
          //   alignItems="center"
          spacing={1}>
          {content}
        </Grid>
      </Container></>
  )
}


export const UserPostsLists = () => {
  const [userPosts, setUserPosts] = useState();
  console.log(userPosts);

  return (<>
    <PostsList userLists={{ userPosts, setUserPosts }} />
  </>)
}