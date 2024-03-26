import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { DeletePost } from '../posts/editpostform';

let token=Cookies.get("token");
console.log(token);
export const apiSlice = createApi(
    
    {
   
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://node-rest-api-pji2.onrender.com' ,
     headers: {Authorization:  `Bearer ${token!==''? token:''}`}}),
     tagTypes: ['Post', 'User'],
    endpoints: builder => ({
        logIn: builder.mutation({
            query: ({ ...body }) => ({
                url: '/login',
                method: 'POST',
                body: body
            })
        }),
        getPosts: builder.query({
            query: () => '/post/getPosts',
            providesTags: ['Post'],
        }),
        getPostsByUser:builder.query({
            query:()=>"/post/getPostsByUser"
        }),
        addPost:builder.mutation({
            query:({ ...body }) => (
                {
                url: '/post/create',
                method: 'POST',
                body: body
            })
        }),
        deletePost:builder.mutation({
            query:(postId)=>(
                // console.log(postId),
                {
                url:`/post/delete/${postId}`,
                method:'DELETE',
            })
        })
        ,updatePost:builder.mutation({
            query:(post)=>(
                console.log(post),
                {
              url:`post/update/${post.id}`,
              method:'PATCH',
              body:post
            })
          }),
        updateReactions:builder.mutation({
          query:({...body})=>({
            url:'post/updateReactions',
            method:'POST',
            body:body
          })
        }),
        signUp: builder.mutation({
            query: ({ ...body }) => ({
                url: '/signup',
                method: 'POST',
                body: body
            })
        })
    })
})

export const { useGetPostsQuery, useSignUpMutation, useGetPostsByUserQuery,
    useLogInMutation,useAddPostMutation,useDeletePostMutation,useUpdatePostMutation,
    useUpdateReactionsMutation } = apiSlice;