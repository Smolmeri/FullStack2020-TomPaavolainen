import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        borderRadius: 8,
        border: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5,
    }
    const [fullView, toggleFullView] = useState(false)

    const like = () => {
        addLike({ blog })
    }

    const remove = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog)
        }
    }

    if (fullView) {
        return (
            <div style={blogStyle} className="blog">
                {blog.title} - {blog.author}{' '}
                <button onClick={() => toggleFullView(!fullView)}> hide </button>
                <br />
                {blog.url} <br />
        likes: {blog.likes} <button onClick={like}> like </button>
                <br />
        added by: {user.name} <br />
                <button id="remove-button" onClick={remove}>
                    {' '}
          remove{' '}
                </button>
            </div>
        )
    } else {
        return (
            <div style={blogStyle} className="blog">
                {blog.title} - {blog.author}{' '}
                <button id="view-button" onClick={() => toggleFullView(!fullView)}>
                    {' '}
          view{' '}
                </button>
            </div>
        )
    }
}

export default Blog
