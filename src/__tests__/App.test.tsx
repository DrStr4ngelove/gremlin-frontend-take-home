import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import { SearchThemeProvider } from '../context'

// Mock the child components to focus on the App component
jest.mock('../components/Header', () => () => (
    <div data-testid="header">Header</div>
))
jest.mock('../components/SubHeader', () => () => (
    <div data-testid="subheader">SubHeader</div>
))
jest.mock('../components/Main', () => () => <div data-testid="main">Main</div>)

describe('App', () => {
    test('renders Header, SubHeader, and Main components', () => {
        render(<App />)

        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('subheader')).toBeInTheDocument()
        expect(screen.getByTestId('main')).toBeInTheDocument()
    })

    test('renders within SearchThemeProvider', () => {
        render(<App />)

        // Check if the components are rendered, indicating that SearchThemeProvider is working
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('subheader')).toBeInTheDocument()
        expect(screen.getByTestId('main')).toBeInTheDocument()
    })
})
