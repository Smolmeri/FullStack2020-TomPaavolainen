/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const token = req.token
    if (!token) {
        return response.status(401).end()
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    savedBlog.user = user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updated = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    res.json(updated.toJSON())

})

module.exports = blogsRouter