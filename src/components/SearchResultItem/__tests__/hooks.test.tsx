import { useResultItemProps } from '../hooks'
import { useSearchThemeContext } from '../../../context'

// Mock the context to provide controlled values for the tests
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

describe('useResultItemProps', () => {
    const mockResult = {
        package: {
            name: 'Test Package',
            description: 'This is a test package',
            version: '1.0.0',
            searchScore: 10,
            author: {
                name: 'Test Author',
            },
        },
    }

    const mockProps = { result: mockResult }

    beforeEach(() => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'light',
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('returns formatted result with theme', () => {
        const { formattedResult, theme } = useResultItemProps(mockProps)
        expect(formattedResult.name).toBe('Test Package')
        expect(formattedResult.description).toBe('This is a test package')
        expect(formattedResult.version).toBe('1.0.0')
        expect(formattedResult.score).toBe(10)
        expect(formattedResult.author).toBe('Test Author')
        expect(theme).toBe('light')
    })

    test('returns default values when result properties are missing', () => {
        const { formattedResult, theme } = useResultItemProps({
            result: {},
        } as any)
        expect(formattedResult.name).toBe('')
        expect(formattedResult.description).toBe('')
        expect(formattedResult.version).toBe('')
        expect(formattedResult.score).toBe(0)
        expect(formattedResult.author).toBe('')
        expect(theme).toBe('light')
    })

    test('returns dark theme when context provides dark theme', () => {
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            theme: 'dark',
        })

        const { formattedResult, theme } = useResultItemProps(mockProps)
        expect(formattedResult.name).toBe('Test Package')
        expect(formattedResult.description).toBe('This is a test package')
        expect(formattedResult.version).toBe('1.0.0')
        expect(formattedResult.score).toBe(10)
        expect(formattedResult.author).toBe('Test Author')
        expect(theme).toBe('dark')
    })
})
