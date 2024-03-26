import { useDispatch } from 'react-redux'
import { create, postReactionAdded} from './postsSlice'
import { useUpdateReactionsMutation } from '../api/apiSlice'
import { useState } from 'react'
import Cookies from 'js-cookie'


const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}


export const ReactionButtons = ({ post ,userLists}) => {
    // console.log(Object.entries(reactionEmoji));
    const [reactionCount,setReactionCount]=useState();
    const {userPosts, setUserPosts}=userLists?userLists:'';



    const dispatch = useDispatch();
    const [reaction,isLoading]=useUpdateReactionsMutation();
    const token=Cookies.get("token");

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button disabled={!token}
             key={name}
                // type="button"
                style={{
                    border: "none",
                    borderRadius: '10px',
                    backgroundColor: 'none',
                    margin: '10px',
                    padding: '10px'
                }}
                onClick={() =>{
                    let count= post.reaction[name] ;
                    count++;
                    let obj={ postId: post.id, 
                    }
                    obj[name]=count
                    reaction(obj).unwrap()
                    .then((payload) => {
                        // console.log('fulfilled', payload)
                        dispatch(postReactionAdded({postId:obj.postId,
                        name:name
                        }));
                        if(userLists){
                        setUserPosts(userPosts.map(ele=>{

                            if(ele.id===post.id){
                                return({...ele,reaction:{
                                    ...ele.reaction,
                                    [`${name}`]:count
                                }})}
                                else{
                                    return ele
                                }
                            
                        }))}
                    })
                        .catch(err=>console.log(err))
                 } }       
            >

                {emoji}
                {/* {name} */}
                {post.reaction[name]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}