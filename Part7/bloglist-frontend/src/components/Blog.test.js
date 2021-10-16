import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog

    beforeEach(() => {
        blog = {
            title: 'Testing 101',
            author: 'P.G Wodehouse',
            url: 'wodehouse.co.uk',
            likes: 666
        }
    })

    test('only renders blog title and author', () => {

        const component = render(
            <Blog blog={blog} />
        )

        expect(component.container).toHaveTextContent('Testing 101')
        expect(component.container).toHaveTextContent('P.G Wodehouse')
        expect(component.container).not.toHaveTextContent('wodehouse.co.uk')
        expect(component.container).not.toHaveTextContent('666')
    })

    test('url and likes render after button is clicked', () => {
        const user = { name: 'Pelham Grenville' }
        const component = render(
            <Blog blog={blog} user={user} />
        )

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('wodehouse.co.uk')
        expect(component.container).toHaveTextContent('666')
    })

    test('clicking like twice calls the handler twice', () => {
        const user = { name: 'Matt' }

        const mockLike = jest.fn()

        const { getByText } = render(
            <Blog blog={blog} user={user} addLike={mockLike} />
        )

        fireEvent.click(getByText('view'))
        fireEvent.click(getByText('like'))
        fireEvent.click(getByText('like'))
        expect(mockLike.mock.calls.length).toBe(2)
    })

})
