import React from 'react'
import SearchResultItem from '../SearchResultItem'
import { useSearchThemeContext } from '../../context'
import { SearchResult } from '../types'
import './SearchResults.css'
import SortBy from './SortBy'

export const SearchResults: React.FC = () => {
    const {
        searchResults = [],
        theme,
        errorMessage = '',
        sortResults,
    } = useSearchThemeContext()

    // Reurn error message if there is one
    if (errorMessage) {
        return (
            <div className={`search-results ${theme}`}>
                <p className="error-message">{errorMessage}</p>
            </div>
        )
    }
    // Return search results if there are any
    return (
        <div className={`search-results ${theme}`}>
            {searchResults.length === 0 ? (
                <p className="no-results">No results found</p>
            ) : (
                <>
                    <SortBy />
                    {sortResults(searchResults).map(
                        (result: SearchResult, index: number) => (
                            <SearchResultItem
                                key={`result-${index}`}
                                result={result}
                            />
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default SearchResults
