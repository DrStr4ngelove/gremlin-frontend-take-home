export interface HeaderProps {
    onToggleTheme: () => void
    searchQuery: string
    handleSearchChange: (value: string) => void
    handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
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
        score: {
            final: number
            detail: {
                quality: number
                popularity: number
                maintenance: number
            }
        }
        searchScore: number
        highlight: string
    }
}
