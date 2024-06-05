import { useResultItemProps } from '../hooks'
import { useSearchThemeContext } from '../../../context'

// Mock the context to provide controlled values for the tests
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

describe('useResultItemProps', () => {
    const mockResult = {
        result: {
            package: {
                name: 'asdf-cli',
                scope: 'unscoped',
                version: '0.0.0',
                description: 'ergonomic cli',
                date: '2018-11-30T04:54:52.464Z',
                links: {
                    npm: 'https://www.npmjs.com/package/asdf-cli',
                },
                author: {
                    name: 'Ryan Streur',
                },
                publisher: {
                    username: 'ryanstreur',
                    email: 'rjstreur@gmail.com',
                },
                maintainers: [
                    {
                        username: 'ryanstreur',
                        email: 'rjstreur@gmail.com',
                    },
                ],
            },
            flags: {
                unstable: true,
            },
            score: {
                final: 0.16857502096518526,
                detail: {
                    quality: 0.5597556222471157,
                    popularity: 0.0018523836887158068,
                    maintenance: 0,
                },
            },
            searchScore: 5.9266753,
            highlight: '<em>asdf</em>-cli',
        },
    }

    beforeEach(() => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'light',
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('returns formatted result', () => {
        const { formattedResult } = useResultItemProps(mockResult as any)
        expect(formattedResult).toEqual({
            name: 'asdf-cli',
            description: 'ergonomic cli',
            version: '0.0.0',
            score: 0,
            author: 'Ryan Streur',
        })
    })

    test('returns default values when result properties are missing', () => {
        const { formattedResult } = useResultItemProps({} as any)
        expect(formattedResult.name).toBe('')
        expect(formattedResult.description).toBe('')
        expect(formattedResult.version).toBe('')
        expect(formattedResult.score).toBe(0)
        expect(formattedResult.author).toBe('')
    })

    test('returns dark theme when context provides dark theme', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'dark',
        })

        const { theme } = useResultItemProps(mockResult as any)
        expect(theme).toBe('dark')
    })
})
