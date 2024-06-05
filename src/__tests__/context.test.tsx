import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'
import { SearchThemeProvider, useSearchThemeContext } from '../context'

// Test component to consume context
const TestComponent = () => {
    const {
        searchResults,
        setSearchResults,
        theme,
        toggleTheme,
        totalPackages,
        errorMessage,
        setErrorMessage,
    } = useSearchThemeContext()

    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button data-testid="toggle-theme" onClick={toggleTheme}>
                Toggle Theme
            </button>
            <span data-testid="total-packages">{totalPackages}</span>
            <button
                data-testid="add-error"
                onClick={() => setErrorMessage([...errorMessage, 'New Error'])}
            >
                Add Error
            </button>
            <span data-testid="error-messages">{errorMessage}</span>
            <button
                data-testid="add-result"
                onClick={() =>
                    setSearchResults([
                        ...searchResults,
                        { package: { name: 'Test' } },
                    ])
                }
            >
                Add Result
            </button>
            <span data-testid="search-results">{searchResults.length}</span>
        </div>
    )
}

describe('SearchThemeContext', () => {
    test('provides default values', () => {
        render(
            <SearchThemeProvider>
                <TestComponent />
            </SearchThemeProvider>
        )

        expect(screen.getByTestId('theme')).toHaveTextContent('light')
        expect(screen.getByTestId('total-packages')).toHaveTextContent('0')
        expect(screen.getByTestId('error-messages')).toHaveTextContent('')
        expect(screen.getByTestId('search-results')).toHaveTextContent('0')
    })

    test('toggles theme correctly', () => {
        render(
            <SearchThemeProvider>
                <TestComponent />
            </SearchThemeProvider>
        )

        expect(screen.getByTestId('theme')).toHaveTextContent('light')
        fireEvent.click(screen.getByTestId('toggle-theme'))
        expect(screen.getByTestId('theme')).toHaveTextContent('dark')
        fireEvent.click(screen.getByTestId('toggle-theme'))
        expect(screen.getByTestId('theme')).toHaveTextContent('light')
    })

    test('adds error messages correctly', () => {
        render(
            <SearchThemeProvider>
                <TestComponent />
            </SearchThemeProvider>
        )

        fireEvent.click(screen.getByTestId('add-error'))
        expect(screen.getByTestId('error-messages')).toHaveTextContent(
            'New Error'
        )
    })

    test('adds search results correctly', () => {
        render(
            <SearchThemeProvider>
                <TestComponent />
            </SearchThemeProvider>
        )

        fireEvent.click(screen.getByTestId('add-result'))
        expect(screen.getByTestId('search-results')).toHaveTextContent('1')
        expect(screen.getByTestId('total-packages')).toHaveTextContent('1')
    })

    test('throws error when using context outside provider', () => {
        const { result } = renderHook(() => useSearchThemeContext())

        expect(result.error).toEqual(
            new Error(
                'useSearchThemeContext must be used within a SearchThemeProvider'
            )
        )
    })
})
