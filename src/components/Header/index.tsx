import React from 'react'
import { useHeaderProps } from './hooks'
import './Header.css'

export const Header: React.FC = () => {
    const {
        searchQuery,
        handleSearchChange,
        handleSearchSubmit,
        toggleTheme,
        theme,
        shouldBreakAPICall,
        handleCheckboxChange,
    } = useHeaderProps()

    return (
        <header className={`header ${theme}`}>
            <form onSubmit={handleSearchSubmit} className="form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search..."
                    className="input"
                />
                <button type="submit" className="button">
                    Search
                </button>
                <label className={`label ${theme}`}>
                    <input
                        type="checkbox"
                        checked={shouldBreakAPICall}
                        onChange={handleCheckboxChange}
                        className="checkbox"
                    />
                    Break API call
                </label>
            </form>
            <h2>Jameson Blake Collins' Gremlin Test</h2>
            <button onClick={toggleTheme} className="button">
                Theme: {theme}
            </button>
        </header>
    )
}

export default Header
