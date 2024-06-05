import React from 'react'
import SearchResultItem from '../SearchResultItem'
import { useSearchThemeContext } from '../../context'
import { SearchResult } from '../types'
import './SearchResults.css'

const displayErrorMessages = (errorMessages: string[]) => {
    return errorMessages?.map((errorMessage: string, index: number) => (
        <p key={`error-${index}`} className="error-message">
            {errorMessage}
        </p>
    ))
}

export const SearchResults: React.FC = () => {
    const {
        searchResults = [],
        theme,
        errorMessages = [],
    } = useSearchThemeContext()
    if (errorMessages.length > 0) {
        return (
            <div className={`search-results ${theme}`}>
                {displayErrorMessages(errorMessages)}
            </div>
        )
    }
    return (
        <div className={`search-results ${theme}`}>
            {searchResults.length === 0 ? (
                <p className="no-results">No results found</p>
            ) : (
                searchResults.map((result: SearchResult, index: number) => (
                    <SearchResultItem key={`result-${index}`} result={result} />
                ))
            )}
        </div>
    )
}

export default SearchResults
