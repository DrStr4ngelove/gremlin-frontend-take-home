import React from 'react'
import SearchResults from '../SearchResults'
import { useSearchThemeContext } from '../../context'
import './Main.css'

export const Main: React.FC = () => {
    const { theme } = useSearchThemeContext()

    return (
        <main className={`main ${theme}`}>
            <h1>Jameson Blake Collins' Gremlin Test</h1>
            <SearchResults />
        </main>
    )
}

export default Main
