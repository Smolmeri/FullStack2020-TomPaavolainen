import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
describe('<BlogForm />', () => {

    test('updates parent state and calls onSubmit', () => {
        const createBlog = jest.fn()
        const setNotification = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} setNotification={setNotification} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'Zen Golf' }
        })

        fireEvent.change(author, {
            target: { value: 'Dr. Parent' }
        })

        fireEvent.change(url, {
            target: { value: 'www.zengolf.com' }
        })

        fireEvent.submit(form)

        expect(createBlog.mock.calls.length).toBe(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Zen Golf')
        expect(createBlog.mock.calls[0][0].author).toBe('Dr. Parent')
        expect(createBlog.mock.calls[0][0].url).toBe('www.zengolf.com')
    })
})
