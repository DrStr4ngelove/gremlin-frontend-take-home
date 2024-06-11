import React from 'react'
import SearchResultItem from '../SearchResultItem'
import { useSearchThemeContext } from '../../context'
import { SearchResult } from '../types'
import './SearchResults.css'
import SortBy from './SortBy'
import Loader from '../Loader'

export const SearchResults: React.FC = () => {
    const {
        searchResults = [],
        filteredResults = [],
        theme,
        errorMessage = '',
        sortResults,
        loading,
    } = useSearchThemeContext()
    const actualResults =
        filteredResults.length > 0 ? filteredResults : searchResults
    // Reurn error message if there is one
    if (errorMessage) {
        return (
            <div className={`search-results ${theme}`}>
                <p className="error-message">{errorMessage}</p>
            </div>
        )
    }
    // show spinner if loading
    if (loading) {
        return (
            <div className={`search-results ${theme}`}>
                <Loader />
            </div>
        )
    }
    // Return search results if there are any
    return (
        <div className={`search-results ${theme}`}>
            {actualResults.length === 0 ? (
                <p className="no-results">No results found</p>
            ) : (
                <>
                    <SortBy />
                    {sortResults(actualResults).map(
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
