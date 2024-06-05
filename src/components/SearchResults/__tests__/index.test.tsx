import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchResults from '../index'
import { useSearchThemeContext } from '../../../context'
import { SearchResult } from '../../types'

// Mock the context to provide controlled values for the tests
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

jest.mock('../../SearchResultItem', () => {
    return ({ result }: { result: SearchResult }) => (
        <div data-testid="search-result-item">{result.package.name}</div>
    )
})

describe('SearchResults', () => {
    const mockSearchResults: SearchResult[] = [
        {
            package: {
                name: 'Test Package 1',
                description: 'Description 1',
                version: '1.0.0',
                author: { name: 'Author 1' },
                keywords: [],
                date: '',
                links: {
                    npm: '',
                    homepage: '',
                    repository: '',
                    bugs: '',
                },
                publisher: {
                    username: '',
                },
                maintainers: [],
                score: {
                    final: 0,
                    detail: {
                        quality: 0,
                        popularity: 0,
                        maintenance: 0,
                    },
                },
                searchScore: 0,
                highlight: '',
            },
        },
        {
            package: {
                name: 'Test Package 2',
                description: 'Description 2',
                version: '2.0.0',
                author: { name: 'Author 2' },
                keywords: [],
                date: '',
                links: {
                    npm: '',
                    homepage: '',
                    repository: '',
                    bugs: '',
                },
                publisher: {
                    username: '',
                },
                maintainers: [],
                score: {
                    final: 0,
                    detail: {
                        quality: 0,
                        popularity: 0,
                        maintenance: 0,
                    },
                },
                searchScore: 0,
                highlight: '',
            },
        },
    ]

    beforeEach(() => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            searchResults: mockSearchResults,
            theme: 'light',
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders search results correctly', () => {
        render(<SearchResults />)
        expect(screen.getAllByTestId('search-result-item')).toHaveLength(2)
        expect(screen.getByText('Test Package 1')).toBeInTheDocument()
        expect(screen.getByText('Test Package 2')).toBeInTheDocument()
    })

    test('renders "No results found" when there are no search results', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            searchResults: [],
            theme: 'light',
        })

        render(<SearchResults />)
        expect(screen.getByText('No results found')).toBeInTheDocument()
    })

    test('applies the correct theme', () => {
        render(<SearchResults />)
        expect(screen.getByRole('search-results')).toHaveClass('light')
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            searchResults: mockSearchResults,
            theme: 'dark',
        })

        render(<SearchResults />)
        expect(screen.getByRole('search-results')).toHaveClass('dark')
    })
})
