// import * as React from 'react';
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import { useDeletePostMutation } from '../api/apiSlice';


export default function ResponsiveDialog({ dialogs }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { open, setOpen, userPosts, setUserPosts } = dialogs;
    let { postsId } = useParams();
    const [deletePost] = useDeletePostMutation();


    // console.log(userPosts)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // console.log(deletePost);
        deletePost(postsId).unwrap()
            .then(payload => setUserPosts(userPosts.filter((ele, ids) => ele.id !== parseInt(postsId))))
            .then(err =>err);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure,you want to delete this post?

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/posts" replace>
                        <Button autoFocus
                            variant='contained' onClick={() => setOpen(false)} size='small'>
                            Cancel
                        </Button></Link>
                    <Link to="/posts" replace>
                        <Button sx={{ backgroundColor: 'red', color: 'white' }} size='small' onClick={handleClose} autoFocus>
                            Delete
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}