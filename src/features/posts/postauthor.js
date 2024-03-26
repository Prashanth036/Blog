import { useSelector } from 'react-redux'


export const PostAuthor=({userId})=>{
    /* const author= useSelector(state=>
        state.users.find(user=>user.id===userId)
        ) */
    //    console.log(userI)
        return (<>
        by <span style={{
            color:' #1769aa',
            fontWeight:'bolder',
            padding:'8px'
        }} >
             {userId!=='' ? userId.replace(/^./, str => str.toUpperCase()): 'Unknown author'}            
        </span></>
)}