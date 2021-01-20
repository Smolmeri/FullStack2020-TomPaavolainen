import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = React.createRef()

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addBlog = (blogObject) => {
        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog))
            })
            .catch(() => {
                setErrorMessage('Something went wrong with adding the blog.')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const removeBlog = (blogObject) => {
        blogService
            .remove(blogObject)
            .then(() => {
                setBlogs(blogs.filter((b) => b.id !== blogObject.id))
                setNotification('Succesfully deleted')
            })
            .catch(() => {
                setErrorMessage(
                    'The blog you are trying to delete was already deleted from server'
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const addLike = ({ blog }) => {
        const changedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        blogService
            .update(changedBlog, blog.id)
            .then((returnedBlog) => {
                const editedBlogs = blogs.map((b) =>
                    b.id !== blog.id ? b : returnedBlog
                )
                setBlogs(editedBlogs)
            })
            .catch(() => {
                setErrorMessage('Something went wrong with adding a like.')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const loginForm = () => (
        <div>
            <h1>Log in</h1>
            <Notification message={notification} />
            <Error message={errorMessage} />
            <form onSubmit={handleLogin}>
                <div>
          username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        autoComplete="off"
                    />
                </div>
                <div>
          password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogsList = () => (
        <div>
            <h1>Blogs</h1>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogout}>Log out</button>
            <Notification message={notification} />
            <Error message={errorMessage} />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} setNotification={setNotification} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    removeBlog={removeBlog}
                    user={user}
                />
            ))}
        </div>
    )

    return <div>{user === null ? loginForm() : blogsList()}</div>
}

export default App
