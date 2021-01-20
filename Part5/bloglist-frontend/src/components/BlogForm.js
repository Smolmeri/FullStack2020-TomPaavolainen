import React, { useState } from 'react'

const BlogForm = ({ createBlog, setNotification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setAuthor('')
        setTitle('')
        setUrl('')
        setNotification(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <div>
            <h2>create new blog </h2>
            <form onSubmit={addBlog}>
                <div>
          title: &nbsp;
                    <input id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
          author: &nbsp;
                    <input id="author" value={author} onChange={handleAuthorChange} />
                </div>
                <div>
          url: &nbsp;
                    <input id="url" value={url} onChange={handleUrlChange} />
                </div>
                <button id="submit-blog" type="submit">
          add new blog
                </button>
            </form>
        </div>
    )
}

export default BlogForm
