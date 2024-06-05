import React from 'react'
import { useResultItemProps } from './hooks'
import { SearchResult } from '../types'
import './SearchResultItem.css'

export const SearchResultItem: React.FC<any> = (props) => {
    const { formattedResult } = useResultItemProps(props)
    const { name, description, version, author } = formattedResult

    return (
        <div className="search-result-item">
            {/* TODO: add on hover for clickable link to change search value */}
            <h2 onClick={() => null}>{name}</h2>
            <p>{description}</p>
            {/* TODO: add cells for keywords */}
            {author ? (
                <div className="author-info">
                    <span>v{version}</span> by <span>{author}</span>
                </div>
            ) : null}
        </div>
    )
}

export default SearchResultItem
