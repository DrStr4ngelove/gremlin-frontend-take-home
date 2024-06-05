import React, { createContext, useState, useContext, ReactNode } from 'react'
import { SearchResult } from './components/types'

interface SearchThemeContextProps {
    searchResults: SearchResult[]
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
    theme: string
    toggleTheme: () => void
    totalPackages: number
}

const SearchThemeContext = createContext<SearchThemeContextProps | undefined>(
    undefined
)

const SearchThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
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
