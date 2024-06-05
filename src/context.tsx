import React, { createContext, useState, useContext, ReactNode } from 'react'
import { SearchResult, SearchThemeContextProps } from './components/types'

const SearchThemeContext = createContext<SearchThemeContextProps | undefined>(
    undefined
)

const SearchThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
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
