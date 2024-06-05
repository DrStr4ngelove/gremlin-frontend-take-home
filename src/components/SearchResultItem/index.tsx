import React from 'react'
import { useResultItemProps } from './hooks'
import './SearchResultItem.css'

export const SearchResultItem: React.FC<any> = (props) => {
    const { formattedResult } = useResultItemProps(props)
    const { name, description, version, author, link } = formattedResult

    return (
        <div className="search-result-item">
            <h2>
                <a href={link}>{name}</a>
            </h2>
            <p>{description}</p>
            {/* TODO: add cells for keywords */}
            <div className="author-info">
                <span>v{version}</span>
                {author ? <span> by {author}</span> : null}
            </div>
        </div>
    )
}

export default SearchResultItem
