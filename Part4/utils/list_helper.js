const _ = require('lodash')

const totalLikes = (blogs) => {
    const total = blogs.reduce((acc, curr) => {
        return acc + curr.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    const fav = blogs.reduce((acc, curr) => {
        if (curr.likes > acc.likes) return curr
        return acc
    }, blogs[0])

    return { title: fav.title, author: fav.author, likes: fav.likes }
}


const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const blogsOrdered = _.countBy(blogs, 'author')

    const sorted = _.chain(blogsOrdered)
        .map((blogs, author) => {
            return {
                author: author,
                blogs: blogs
            }
        }).sortBy('blogs')
        .value()

    const authorOfMostBlogs = sorted.reduce((acc, curr) => {
        if (curr.blogs > acc.blogs) return curr
        return acc
    }, sorted[0])

    return authorOfMostBlogs

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const result = _.chain(blogs)
        .groupBy('author')
        .toPairs()
        .map(s => {
            return _.zipObject(['author', 'likes'], s)
        })
        .map(s => {
            s.likes = _.map(s.likes, x => x.likes)
            return s
        })
        .value()


    const authorWithMostLikes = result.reduce((acc, curr) => {
        let likes = _.sum(curr.likes)
        if (likes > acc.likes) return { author: curr.author, likes: likes }
        return acc
    }, { author: result[0].author, likes: _.sum(result[0].likes) })

    return authorWithMostLikes

}

module.exports = {
    totalLikes, favoriteBlog, mostBlogs, mostLikes
}