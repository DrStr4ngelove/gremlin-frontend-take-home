import { useState } from 'react'
import { HeaderProps } from '../types'
import { useSearchThemeContext } from '../../context'

export const useHeaderProps = (): any => {
    // define state variables
    const [searchQuery, setSearchQuery] = useState('')
    const [shouldBreakAPICall, setShouldBreakAPICall] = useState(false)

    const { toggleTheme, theme, setSearchResults } = useSearchThemeContext()

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
    }

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // fetch results
        fetch(`https://api.npms.io/v2/search/suggestions?q=${searchQuery}`)
            .then((response) => response.json()) // format to json
            .then((data) => {
                // format response
                const sortedData = data.sort(
                    (a: any, b: any) =>
                        b.searchScore.final - a.searchScore.final
                )
                setSearchResults(sortedData)
            })
            .catch((error) => {
                // handle the error
                console.error('Error fetching search results:', error)
            })
    }

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
