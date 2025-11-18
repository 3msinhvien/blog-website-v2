const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// Legacy blog data kept for reference (not used by endpoints now)
// const blog = require('./data/blog')
const { BlogPosts } = require('./data/BlogPosts')
const {Users} = require('./data/Users')
const app = express()
const port = 8080

// Enable CORS for all routes
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

//api 1: get blog list
app.get('/', (req, res) => {
  res.json(BlogPosts)
})

// api 2: get blog detail by slug

// app.get('/post/:slug', (req, res) => {
//   const post = BlogPosts.find(p => p.slug === req.params.slug)
//   if (!post) {
//     return res.status(404).json({ message: 'Blog post not found' })
//   }
//   return res.json(post)
// })

// api 3: create a new blog post
app.post('/api/post', (req, res) => {
  const { slug, title, description } = req.body || {}

  if (!slug || !title || !description) {
    return res.status(400).json({ message: 'Missing required fields: slug, title, description' })
  }

  // prevent duplicate slugs
  if (BlogPosts.some(p => p.slug === slug)) {
    return res.status(409).json({ message: 'Slug already exists' })
  }

  const post = { slug, title, description }
  BlogPosts.push(post)
  // Keep response aligned with guide
  return res.status(200).send({ message: 'Posted successful' })
})

// api 4: login 
app.post("/api/login", (req, res) => {
  const cred = {
    username: req.body.username,
    password: req.body.password
  };
  if (cred.username === "admin" && cred.password === "123") {
    res.status(200).send({ message: "Login successful" });
  }
  else {
    res.status(400).send({ message: "Login failed" })
  }
});

// api 5 + 6: Get post list and post detail
app.get("/api/posts", (req, res) => {
  res.send(JSON.stringify(BlogPosts));
})
app.get("/api/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
})

app.post("/api/addUser", (req, res) => {
    const {username, password} = req.body || {} ;
    if (!username || !password) {
      res.status(400).send({message:"Username va password khong duoc trong"})
    }
      if (Users.some(u => u.username === username)) {
    return res.status(409).json({ message: 'Username already exists' })   
  }
    const user = {username, password}
    Users.push(user)
    res.status(200).send({message:"User created"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
