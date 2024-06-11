import { useState } from 'react'
import { HeaderProps, SearchResult } from '../types'
import { useSearchThemeContext } from '../../context'

export const useHeaderProps = (): HeaderProps => {
    // define state variables
    const [searchQuery, setSearchQuery] = useState('')
    const [shouldBreakAPICall, setShouldBreakAPICall] = useState(false)

    // retrieve context
    const { toggleTheme, theme, setSearchResults, setErrorMessage } =
        useSearchThemeContext()

    // handle search change - this could be deduped so as to not continuually re-render from parent component
    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    // handle search submit - no need to memoize with useCallback
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // prevent default form submission
        event.preventDefault()

        // clear error message
        setErrorMessage('')

        // Do not call api if there is no search query
        if (!searchQuery) {
            // clear search results
            setSearchResults([])
            return
        }

        // construct url
        const url = shouldBreakAPICall
            ? null
            : `https://api.npms.io/v2/search/suggestions?q=${searchQuery}`

        // fetch results
        fetch(url)
            .then((response) => response.json()) // format to json
            .then((data) => {
                // format response
                const sortedData = data.sort(
                    (a: SearchResult, b: SearchResult) =>
                        b.searchScore - a.searchScore
                )
                setSearchResults(sortedData)
            })
            .catch((error) => {
                // handle the error
                console.error('Error fetching search results:', error)
                setSearchResults([])
                setErrorMessage('Error fetching search results')
            })
    }

    // handle checkbox change - no need to memoize with useCallback
    const handleCheckboxChange = () => {
        setShouldBreakAPICall((prev) => !prev)
    }

    return {
        searchQuery,
        handleSearchChange,
        handleSearchSubmit,
        toggleTheme,
        theme,
        shouldBreakAPICall,
        handleCheckboxChange,
    }
}
