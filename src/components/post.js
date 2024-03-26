import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { useGetPostsQuery } from '../features/api/apiSlice';
import { Spinner } from './Spinner';
import { TimeAgo } from '../features/posts/timeago';
import { PostAuthor } from '../features/posts/postauthor';
import { ReactionButtons } from '../features/posts/reactionbuttons';
import { useSelector,useDispatch } from 'react-redux'
import { getPost, selectAllPosts } from '../features/posts/postsSlice';

// import { TimeAgo } from './timeago';

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '24px',
  opacity: 0.3,
};

export default function Testimonials({useGetPostById}) {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  const posts = useSelector(selectAllPosts);
//   console.log(posts)

  const orderedPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.date))



  let content

  /* if(isLoading){
    content=<Spinner text='Loading.....' />
  }else if(isSuccess && posts.data.length>=1) */
  if(posts&&posts.length>1){ 
    content=orderedPosts.map((testimonial, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
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
                title={testimonial.title.replace(/^./, str => str.toUpperCase())}  
                titleTypographyProps={{sx:{color:'black',fontSize:20,fontWeight:'bolder',fontFamily:'times'}}}             
                subheaderTypographyProps={{
                    sx:{
                        padding:'10px',
                       /*  color: (theme) =>
                          theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                      }} */
                    }}}
                subheader={ <>
                <PostAuthor userId={testimonial.username} /> 
                <TimeAgo timestamp={testimonial.createdAt} /></> }
              />
               {/* </Typography> */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              {testimonial.content}
              </Typography>
            </CardContent>
            <CardHeader 
            titleTypographyProps={{}}
              title={<ReactionButtons post={testimonial} /> }
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
      ))}
 /*  }else if(isError){
    content=<div>{error.toString()}</div>
  } */


  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3 , sm: 6 },
      }}
    >
     
      <Grid container  direction="column" 
       justifyContent="center"
//   alignItems="center"
   spacing={1}>
       {content}
      </Grid>
    </Container>
  );
}