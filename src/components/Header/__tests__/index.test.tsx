import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Header } from '../index'
import { useHeaderProps } from '../hooks'

// Mock the hook to provide controlled values and functions for the tests
jest.mock('../hooks', () => ({
    useHeaderProps: jest.fn(),
}))

describe('Header', () => {
    const mockHandleSearchChange = jest.fn()
    const mockHandleSearchSubmit = jest.fn((e) => e.preventDefault())
    const mockToggleTheme = jest.fn()
    const mockHandleCheckboxChange = jest.fn()

    beforeEach(() => {
        ;(useHeaderProps as jest.Mock).mockReturnValue({
            searchQuery: '',
            handleSearchChange: mockHandleSearchChange,
            handleSearchSubmit: mockHandleSearchSubmit,
            toggleTheme: mockToggleTheme,
            theme: 'light',
            shouldBreakAPICall: false,
            handleCheckboxChange: mockHandleCheckboxChange,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders correctly', () => {
        render(<Header />)
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
        expect(screen.getByText('Search')).toBeInTheDocument()
        expect(screen.getByText('Break API call')).toBeInTheDocument()
        expect(screen.getByText('Theme: light')).toBeInTheDocument()
    })

    test('handles search input change', () => {
        render(<Header />)
        const searchInput = screen.getByPlaceholderText('Search...')
        fireEvent.change(searchInput, { target: { value: 'react' } })
        expect(mockHandleSearchChange).toHaveBeenCalledWith('react')
    })

    test('handles search submit', () => {
        render(<Header />)
        const form = screen.getByRole('form')
        fireEvent.submit(form)
        expect(mockHandleSearchSubmit).toHaveBeenCalled()
    })

    test('handles theme toggle', () => {
        render(<Header />)
        const themeButton = screen.getByText('Theme: light')
        fireEvent.click(themeButton)
        expect(mockToggleTheme).toHaveBeenCalled()
    })

    test('handles checkbox change', () => {
        render(<Header />)
        const checkbox = screen.getByLabelText('Break API call')
        fireEvent.click(checkbox)
        expect(mockHandleCheckboxChange).toHaveBeenCalled()
    })

    test('renders dark theme correctly', () => {
        ;(useHeaderProps as jest.Mock).mockReturnValue({
            searchQuery: '',
            handleSearchChange: mockHandleSearchChange,
            handleSearchSubmit: mockHandleSearchSubmit,
            toggleTheme: mockToggleTheme,
            theme: 'dark',
            shouldBreakAPICall: false,
            handleCheckboxChange: mockHandleCheckboxChange,
        })

        render(<Header />)
        const header = screen.getByRole('banner')
        expect(header).toHaveClass('header dark')
        expect(screen.getByText('Theme: dark')).toBeInTheDocument()
    })
})
