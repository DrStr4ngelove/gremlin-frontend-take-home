import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SubHeader from '../index'
import { useSearchThemeContext } from '../../../context'

// Mock the context to provide controlled values for the tests
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

describe('SubHeader', () => {
    beforeEach(() => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            totalPackages: 10,
            theme: 'light',
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders total packages correctly when greater than 0', () => {
        render(<SubHeader />)
        expect(screen.getByText('10 Packages Found')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    test('does not render when total packages is 0', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            totalPackages: 0,
            theme: 'light',
        })

        render(<SubHeader />)
        expect(screen.queryByText('0 Packages Found')).not.toBeInTheDocument()
        expect(
            screen.queryByRole('heading', { level: 2 })
        ).not.toBeInTheDocument()
    })

    test('applies the correct theme', () => {
        render(<SubHeader />)
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            totalPackages: 10,
            theme: 'dark',
        })
    })

    test('does not render when total packages is undefined', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            totalPackages: undefined,
            theme: 'light',
        })

        render(<SubHeader />)
        expect(
            screen.queryByText('undefined Packages Found')
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole('heading', { level: 2 })
        ).not.toBeInTheDocument()
    })
})
