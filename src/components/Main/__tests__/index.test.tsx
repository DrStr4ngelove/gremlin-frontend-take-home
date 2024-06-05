import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Main from '../index'
import { useSearchThemeContext } from '../../../context'
import { jest } from '@jest/globals'

// Mock the context to provide controlled values and functions for the tests
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

describe('Main', () => {
    beforeEach(() => {
        // Mock default values
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'light',
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders correctly with light theme', () => {
        render(<Main />)
        const mainElement = screen.getByRole('main')
        expect(mainElement).toBeInTheDocument()
        expect(mainElement).toHaveClass('main light')
        expect(
            screen.getByText("Jameson Blake Collins' Gremlin Test")
        ).toBeInTheDocument()
    })

    test('renders correctly with dark theme', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'dark',
        })

        render(<Main />)
        const mainElement = screen.getByRole('main')
        expect(mainElement).toBeInTheDocument()
        expect(mainElement).toHaveClass('main dark')
        expect(
            screen.getByText("Jameson Blake Collins' Gremlin Test")
        ).toBeInTheDocument()
    })
})
