import { useState } from 'react'
import { HeaderProps, SearchResult } from '../types'
import { useSearchThemeContext } from '../../context'

export const useHeaderProps = (): HeaderProps => {
    // define state variables
    const [searchQuery, setSearchQuery] = useState('')
    const [shouldBreakAPICall, setShouldBreakAPICall] = useState(false)
    // retrieve context
    const {
        toggleTheme,
        theme,
        setSearchResults,
        setErrorMessage,
        setLoading,
        setKeywordList,
        setFilteredResults,
    } = useSearchThemeContext()

    // handle search change - this could be debounced
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
            // clear all results
            setSearchResults([])
            setFilteredResults([])
            return
        }

        // construct url
        const url = shouldBreakAPICall
            ? null
            : `https://api.npms.io/v2/search/suggestions?q=${searchQuery}`

        // set loading true
        setLoading(true)
        let keywordList = []
        // fetch results
        fetch(url)
            .then((response) => response.json()) // format to json
            .then((data) => {
                // format response
                const sortedData = data.sort(
                    (a: SearchResult, b: SearchResult) =>
                        b.searchScore - a.searchScore
                )
                // create a funciton to pull out keywords
                sortedData.forEach((result) => {
                    keywordList = keywordList.concat(
                        result.package.keywords || []
                    )
                })
                // dedup in a Set object
                setKeywordList(Array.from(new Set(keywordList.sort())))
                setLoading(false)
                setSearchResults(sortedData)
            })
            .catch((error) => {
                // handle the error
                console.error('Error fetching search results:', error)
                // clear all results
                setSearchResults([])
                setFilteredResults([])
                setLoading(false)
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
