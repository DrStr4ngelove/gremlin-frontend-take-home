import React, { act } from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { SearchThemeProvider, useSearchThemeContext } from '../context'
import { SearchResult } from '../components/types'

// Helper component to access context
const TestComponent: React.FC = () => {
    const { toggleTheme, theme, totalPackages } = useSearchThemeContext()
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <span data-testid="totalPackages">{totalPackages}</span>
            <button data-testid="toggleTheme" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    )
}

describe('SearchThemeContext', () => {
    test('renders children correctly', () => {
        render(
            <SearchThemeProvider>
                <div>Test Child</div>
            </SearchThemeProvider>
        )
        expect(screen.getByText('Test Child')).toBeInTheDocument()
    })

    test('provides initial state values', () => {
        render(
            <SearchThemeProvider>
                <TestComponent />
            </SearchThemeProvider>
        )
        expect(screen.getByTestId('theme')).toHaveTextContent('light')
        expect(screen.getByTestId('totalPackages')).toHaveTextContent('0')
    })

    // test('updates state when toggleTheme is called', () => {
    //     render(
    //         <SearchThemeProvider>
    //             <TestComponent />
    //         </SearchThemeProvider>
    //     )
    //     expect(screen.getByTestId('theme')).toHaveTextContent('light')
    //     screen.getByTestId('toggleTheme').click()
    //     expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    // })

    test('sortResults function sorts results correctly', () => {
        const mockResults: Partial<SearchResult>[] = [
            {
                searchScore: 10,
                score: {
                    final: 0.16857502096518526,
                    detail: {
                        quality: 5,
                        popularity: 7,
                        maintenance: 8,
                    },
                },
            },
            {
                searchScore: 15,
                score: {
                    final: 0.16857502096518526,
                    detail: {
                        quality: 9,
                        popularity: 6,
                        maintenance: 3,
                    },
                },
            },
            {
                searchScore: 5,
                score: {
                    final: 0.16857502096518526,
                    detail: {
                        quality: 3,
                        popularity: 9,
                        maintenance: 10,
                    },
                },
            },
        ]

        const { result } = renderHook(() => useSearchThemeContext(), {
            wrapper: ({ children }) => (
                <SearchThemeProvider>{children}</SearchThemeProvider>
            ),
        })

        act(() => {
            result.current.setSortBy('quality')
        })

        const sortedByQuality = result.current.sortResults(
            mockResults as SearchResult[]
        )
        expect(sortedByQuality[0].score.detail.quality).toBe(9)

        act(() => {
            result.current.setSortBy('popularity')
        })

        const sortedByPopularity = result.current.sortResults(
            mockResults as SearchResult[]
        )
        expect(sortedByPopularity[0].score.detail.popularity).toBe(9)

        act(() => {
            result.current.setSortBy('maintenance')
        })

        const sortedByRelevance = result.current.sortResults(
            mockResults as SearchResult[]
        )
        expect(sortedByRelevance[0].score.detail.maintenance).toBe(10)
    })

    test('useSearchThemeContext throws error if used outside provider', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})
        expect(() => render(<TestComponent />)).toThrow(
            'useSearchThemeContext must be used within a SearchThemeProvider'
        )
        consoleErrorSpy.mockRestore()
    })
})
