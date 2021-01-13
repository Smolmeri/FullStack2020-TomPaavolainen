const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        expect(totalLikes(bigList)).toBe(36)
    })

})

describe('favorite blog returns', () => {
    test('null for empty list', () => {

        expect(favoriteBlog([])).toEqual(null)
    })

    test('the only blog, when list has only one blog,', () => {
        const expected = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }

        expect(favoriteBlog(listWithOneBlog)).toEqual(expected)
    })

    test('the correct one from a bigger list', () => {
        const expected = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
        expect(favoriteBlog(bigList)).toEqual(expected)
    })
})

describe('most blogs returns', () => {
    test('the correct one from a bigger list', () => {
        expect(mostBlogs(bigList).author).toEqual('Robert C. Martin')
    })

    test('returns null from an empty list', () => {
        expect(mostBlogs([])).toEqual(null)
    })
})

describe('most likes returns', () => {
    test('correct author and amount from a bigger list', () => {
        expect(mostLikes(bigList).author).toEqual('Edsger W. Dijkstra')
        expect(mostLikes(bigList).likes).toBe(17)
    })
})

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const bigList = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

const userList = [{ username: 'A', name: 'A', passwordHash: 'A', blogs: [{ type: '1' }, { type: '2' }] },
    { username: 'B', name: 'B', passwordHash: 'B', blogs: [{ type: '3' }] },
    { username: 'Ahkera', name: 'Ahkerin', passwordHash: 'C', blogs: [{ type: '1' }, { type: '2' }, { type: '3' }] },
    { username: 'D', name: 'D', passwordHash: 'D', blogs: [] }
]