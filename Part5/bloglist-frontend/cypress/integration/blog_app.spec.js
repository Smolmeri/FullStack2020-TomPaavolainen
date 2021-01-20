/* eslint-disable no-undef */
describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Tuomas Paavolainen',
            username: 'tomppa',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('Blog app')
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tomppa')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()

            cy.contains('Tuomas Paavolainen logged in')
        })


        it('fails with wrong credentials', function () {
            cy.get('#username').type('tomppa')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('wrong credentials')
        })
    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'tomppa', password: '1234' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Cypress hill')
            cy.get('#author').type('Cypress hill')
            cy.get('#url').type('www.cypresshill.com')
            cy.get('#submit-blog').click()
            cy.contains('Cypress hill')
        })

        describe('an existing blog', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Cypress Hill',
                    author: 'Cypress Hill Co.',
                    url: 'www.cypresshill.com',
                    likes: 0
                })
            })

            it('can be liked', function () {
                cy.get('#view-button').click()
                cy.contains('Cypress hill').parent().find('button')
                    .should('contain', 'like')
            })

            it('can be removed by the original adder', function () {
                cy.get('#view-button').click()
                cy.contains('Cypress hill').contains('remove').click()
                cy.get('html').should('not.contain', 'Cypress hill')
            })

            it('blogs are ordered by likes', function () {
                cy.createBlog({
                    title: 'G-Unit chronicles',
                    author: '50 cent',
                    url: 'www.50c.com',
                    likes: 3
                })

                cy.createBlog({
                    title: 'Lord of the flies',
                    author: 'This one dude',
                    url: 'www.lotf.com',
                    likes: 100
                })

                cy.get('.blog').then(blogs => {
                    cy.wrap(blogs[0]).should('contain', 'Lord of the flies')
                    cy.wrap(blogs[1]).should('contain', 'G-Unit chronicles')
                })
            })

        })
    })
})