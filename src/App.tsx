import React from 'react'
import Header from './components/Header'
import SubHeader from './components/SubHeader'
import Main from './components/Main'
import { SearchThemeProvider } from './context'

const App: React.FC = () => {
    return (
        <SearchThemeProvider>
            <Header />
            <SubHeader />
            <Main />
        </SearchThemeProvider>
    )
}

export default App
