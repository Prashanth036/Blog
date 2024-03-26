import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route

} from 'react-router-dom'

import LandingPage from './layout/layout'
import { PostsList, UserPostsLists } from './features/posts/postsList'
import { AddPostForm } from './features/posts/addpostform'
import { SinglePostPage } from './features/posts/singlePost'
import { DeletePost, EditPostForm } from './features/posts/editpostform'
import SignUp from './pages/signup'
import Hero from './components/Hero'
import LogIn from './pages/login'
import { RequireAuth } from './pages/requireAuth'
import { AnonmyousRoutes } from './pages/anonmyousRoute'
import Testimonials from './components/post'
import { useGetPostsByUserQuery } from './features/api/apiSlice'
import Cookies from 'js-cookie'


function App() {

  return (
    <Router >

      <div className="App">
        <Routes >
          <Route element={<LandingPage />}>
            <Route index path="/" element={<Hero />} />
            <Route element={<AnonmyousRoutes />}>
              <Route path='/login' element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path='*' element={<>Not Found</>} />
              <Route path="/posts" element={   <UserPostsLists /> }/>
              <Route path="/posts/:postsId/delete"   element={ <UserPostsLists />} />
              <Route path="/posts/:postId/edit" element={<UserPostsLists />} />
            </Route>



            {/* <Route path="/logout" element={<>
                {Cookies.remove("token")}
              </>} /> */}

          </Route>
    
        </Routes>
      </div>

    </Router>
  )
}

export default App
