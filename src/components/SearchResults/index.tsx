import React from 'react'
import SearchResultItem from '../SearchResultItem'
import { useSearchThemeContext } from '../../context'
import './SearchResults.css'

export const SearchResults: React.FC = () => {
    const { searchResults, theme } = useSearchThemeContext()
    return (
        <div className={`search-results ${theme}`}>
            {searchResults.length === 0 ? (
                <p className="no-results">No results found</p>
            ) : (
                searchResults.map((result: any, index: number) => (
                    <SearchResultItem key={`result-${index}`} result={result} />
                ))
            )}
        </div>
    )
}

export default SearchResults
