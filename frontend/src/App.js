import './styles.css';
import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import Login from './Login'
import PostLists from './PostLists'
import Post from './Post'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams

} from "react-router-dom"

function App() {

  const [blog, setBlog] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setBlog(data)
      })
      .catch((error) => {
        console.error('Error fetching blog data:', error)
      })
  }, [])

  // Removed unused selected state and loadBlog function

  function Home() {
    return (
      <div>
        <h1>Do Tung's Blog</h1>
        <p>Welcome to my Blog</p>
      </div>
    )
  }

  function About() {
    return (
      <div>
        <h2>About me</h2>
        <p>This is the about page.</p>
      </div>
    )
  }

  function NoMatch() {
    return (
      <div>
        <h2>404: Page Not Found</h2>
        <p>The page you're looking for does not exist.</p>
      </div>
    )
  }


  // Post component

  function Posts() {
    return (
      <div>
        <h2>Blog</h2>
        <Outlet />
      </div>
    )
  }

  return (
    <Router>
      <nav>
        <Link to='/'>
          Home
        </Link>
        <Link to='/about'>
          About
        </Link>
        <Link to='/post'>
          Blog
        </Link>
        <Link to='/new'>
          New Post
        </Link>
        <Link to='/login'>
          Login
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/post' element={<Posts />}>
          <Route index element={<PostLists />} />
        </Route>
        <Route path='/new' element={<NewPost />} />
        <Route path='/post/:slug' element={<Post />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
