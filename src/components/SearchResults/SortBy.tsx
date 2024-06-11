import React from 'react'
import { useSearchThemeContext } from 'src/context'

export const SortBy = (): JSX.Element => {
    const {
        totalPackages,
        setSortBy,
        keywordList,
        filterByKeyWord,
        setFilteredResults,
    } = useSearchThemeContext()
    if (totalPackages === 0) {
        return <></>
    }
    return (
        <div className="sorting-options">
            <h3>Sort Packages</h3>
            <div className="radio-group" role="radiogroup">
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="maintenance"
                        onClick={() => {
                            setFilteredResults([])
                            setSortBy('maintenance')
                        }}
                    />
                    Maintenance
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="popularity"
                        onClick={() => {
                            setFilteredResults([])
                            setSortBy('popularity')
                        }}
                    />
                    Popularity
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="quality"
                        onClick={() => {
                            setFilteredResults([])
                            setSortBy('quality')
                        }}
                    />
                    Quality
                </label>
            </div>
            <div className="keywords">
                {keywordList.map((keyword) => (
                    <span onClick={() => filterByKeyWord(keyword)}>
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default SortBy
