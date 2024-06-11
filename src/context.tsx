import React, { createContext, useState, useContext, ReactNode } from 'react'
import { SearchResult, SearchThemeContextProps } from './components/types'

const SearchThemeContext = createContext<SearchThemeContextProps | undefined>(
    undefined
)

// Use context provider to manage state of app
const SearchThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [theme, setTheme] = useState<string>('light')
    const [sortBy, setSortBy] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [keywordList, setKeywordList] = useState<any[]>([])

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    // filter by keyword
    const filterByKeyWord = (keyword: string) => {
        const filteredResults = searchResults.filter((result) =>
            result.package?.keywords?.includes(keyword)
        )
        setFilteredResults(filteredResults)
    }

    // Sort search results based on selected criteria
    const sortResults = (results: SearchResult[]): SearchResult[] => {
        const sortedResults = results.sort(
            (a: SearchResult, b: SearchResult) => {
                switch (sortBy) {
                    case 'quality':
                        return b.score.detail.quality - a.score.detail.quality
                    case 'popularity':
                        return (
                            b.score.detail.popularity -
                            a.score.detail.popularity
                        )
                    case 'maintenance':
                        return (
                            b.score.detail.maintenance -
                            a.score.detail.maintenance
                        )
                    default:
                        return b.searchScore - a.searchScore
                }
            }
        )
        return sortedResults
    }

    return (
        <SearchThemeContext.Provider
            value={{
                searchResults,
                setSearchResults,
                theme,
                toggleTheme,
                totalPackages: searchResults?.length,
                errorMessage,
                setErrorMessage,
                sortResults,
                sortBy,
                setSortBy,
                loading,
                setLoading,
                keywordList,
                setKeywordList,
                filteredResults,
                filterByKeyWord,
                setFilteredResults,
            }}
        >
            {children}
        </SearchThemeContext.Provider>
    )
}

const useSearchThemeContext = () => {
    const context = useContext(SearchThemeContext)
    if (!context) {
        throw new Error(
            'useSearchThemeContext must be used within a SearchThemeProvider'
        )
    }
    return context
}

export { SearchThemeProvider, useSearchThemeContext }
