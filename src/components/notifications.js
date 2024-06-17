import { Card, Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { io } from "socket.io-client";

export const Notifications = ({socket}) => {

  

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
                    <Content notifs={socket}/>
                </Grid>
            </Container>
        </>
    )
}

function Content({notifs}) {
    return (
        <>
            <Grid item xs={12} sm={6} md={4}  sx={{ display: 'flex' }}>
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
           <ul style={{textDecoration:'none'}}> {notifs.map((e,i)=>{
                return <li key={i} style={{ listStyleType: 'none' }}>{e}<hr /></li>
            })}
            </ul>

                    {/* <CardHeader
                        title={testimonial.title.replace(/^./, str => str.toUpperCase())}
                        titleTypographyProps={{ sx: { color: 'black', fontSize: 20, fontWeight: 'bolder', fontFamily: 'times' } }}
                        subheaderTypographyProps={{
                            sx: {
                                padding: '10px',

                            }
                        }}
                        subheader={<>
                            <PostAuthor userId={testimonial.username} />
                            <TimeAgo timestamp={testimonial.createdAt} /></>}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {testimonial.content}
                        </Typography>
                    </CardContent>
                    <CardHeader
                        titleTypographyProps={{}}
                        title={<ReactionButtons post={testimonial} />}
                    /> */}
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
        </>)
}