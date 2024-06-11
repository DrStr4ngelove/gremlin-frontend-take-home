export interface SearchThemeContextProps {
    theme: string
    searchResults: SearchResult[]
    setSearchResults: (results: SearchResult[]) => void
    toggleTheme: () => void
    errorMessage: string
    setErrorMessage: (messages: string) => void
    totalPackages: number | undefined
    sortResults: (results: SearchResult[]) => SearchResult[]
    sortBy: string
    setSortBy: (sortBy: string) => void
}
export interface HeaderProps {
    searchQuery: string
    handleSearchChange: (value: string) => void
    handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    toggleTheme: () => void
    theme: string
    shouldBreakAPICall: boolean
    handleCheckboxChange: () => void
}

export type SearchResult = {
    package: {
        name: string
        version: string
        description: string
        author: {
            name: string
        }
        keywords: string[]
        date: string
        links: {
            npm: string
            homepage: string
            repository: string
            bugs: string
        }
        publisher: {
            username: string
        }
        maintainers: Array<{
            username: string
        }>
        highlight: string
    }
    score: {
        final: number
        detail: {
            quality: number
            popularity: number
            maintenance: number
            relevance: number
        }
    }
    searchScore: number
}

export type ResultItem = {
    formattedResult: {
        name: string
        description: string
        version: string
        author: string
        link: string
    }
    theme: string
}

export type ResultItemProps = {
    result: Partial<SearchResult>
}
