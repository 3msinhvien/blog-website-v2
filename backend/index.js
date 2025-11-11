const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
// Legacy blog data kept for reference (not used by endpoints now)
// const blog = require('./data/blog')
const { BlogPosts } = require('./data/BlogPosts')
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

//api 2: get blog detail by slug

app.get('/post/:slug', (req, res) => {
  const post = BlogPosts.find(p => p.slug === req.params.slug)
  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' })
  }
  return res.json(post)
})

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
