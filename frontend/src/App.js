import './styles.css';
import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import Login from './Login'
import PostLists from './PostLists'
import Post from './Post'
import ProtectedRoute from './ProtectedRoute'
import Stats from './Stats'
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
  const [user, setUser] = useState(null)

  const logOut = () => {
    setUser(null)
  }

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

  function AppLayout() {
    return (
      <>
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}> Home </Link>
          <Link to="/posts" style={{ padding: 5 }}> Posts </Link>
          <Link to="/about" style={{ padding: 5 }}> About </Link>
          <span> | </span>
          {user && <Link to="/stats" style={{ padding: 5 }}> Stats </Link>}
          {user && <Link to="/newpost" style={{ padding: 5 }}> New Post </Link>}
          {!user && <Link to="/login" style={{ padding: 5 }}> Login </Link>}
          {user && <span onClick={logOut} style={{ padding: 5, cursor: 'pointer' }}> Logout </span>}
        </nav>
        <Outlet />
      </>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />}>
            <Route index element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/stats" element={<ProtectedRoute user={user}><Stats /></ProtectedRoute>} />
          <Route path="/newpost" element={<ProtectedRoute user={user}><NewPost /></ProtectedRoute>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
