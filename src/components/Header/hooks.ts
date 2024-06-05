import { useState } from 'react'
import { HeaderProps } from '../types'
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
        event.preventDefault()
        setErrorMessage('')
        const url = shouldBreakAPICall
            ? ''
            : `https://api.npms.io/v2/search/suggestions?q=${searchQuery}`
        // fetch results
        fetch(url)
            .then((response) => response.json()) // format to json
            .then((data) => {
                // format response
                const sortedData = data.sort(
                    (a: any, b: any) => b.searchScore - a.searchScore
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
