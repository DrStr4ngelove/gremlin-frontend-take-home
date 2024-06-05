import { renderHook, act } from '@testing-library/react-hooks'
import { useHeaderProps } from '../hooks'
import { useSearchThemeContext } from '../../../context'

// Mock the context
jest.mock('../../../context', () => ({
    useSearchThemeContext: jest.fn(),
}))

describe('useHeaderProps', () => {
    let setSearchResultsMock: jest.Mock
    let toggleThemeMock: jest.Mock
    let setErrorMessagesMock: jest.Mock
    beforeEach(() => {
        setSearchResultsMock = jest.fn()
        toggleThemeMock = jest.fn()
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            toggleTheme: toggleThemeMock,
            theme: 'light',
            setSearchResults: setSearchResultsMock,
            setErrorMessages: setErrorMessagesMock,
        })
    })

    it('should initialize state correctly', () => {
        const { result } = renderHook(() => useHeaderProps())

        expect(result.current.searchQuery).toBe('')
        expect(result.current.shouldBreakAPICall).toBe(false)
    })

    it('should update search query', () => {
        const { result } = renderHook(() => useHeaderProps())

        act(() => {
            result.current.handleSearchChange('test query')
        })

        expect(result.current.searchQuery).toBe('test query')
    })

    it('should toggle checkbox state', () => {
        const { result } = renderHook(() => useHeaderProps())

        act(() => {
            result.current.handleCheckboxChange()
        })

        expect(result.current.shouldBreakAPICall).toBe(true)

        act(() => {
            result.current.handleCheckboxChange()
        })

        expect(result.current.shouldBreakAPICall).toBe(false)
    })

    it('should submit search and update results', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useHeaderProps())

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ searchScore: { final: 1 } }]),
            })
        ) as jest.Mock

        act(() => {
            result.current.handleSearchChange('react')
        })

        act(() => {
            result.current.handleSearchSubmit({
                preventDefault: () => {},
            } as React.FormEvent<HTMLFormElement>)
        })

        await waitForNextUpdate()

        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.npms.io/v2/search/suggestions?q=react'
        )
        expect(setSearchResultsMock).toHaveBeenCalledWith([
            { searchScore: { final: 1 } },
        ])
    })

    it('should handle fetch error', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useHeaderProps())

        global.fetch = jest.fn(() =>
            Promise.reject(new Error('API Error'))
        ) as jest.Mock

        console.error = jest.fn()

        act(() => {
            result.current.handleSearchChange('react')
        })

        act(() => {
            result.current.handleSearchSubmit({
                preventDefault: () => {},
            } as React.FormEvent<HTMLFormElement>)
        })

        await waitForNextUpdate()

        expect(global.fetch).toHaveBeenCalledWith('')
        expect(console.error).toHaveBeenCalledWith(
            'Error fetching search results:',
            new Error('API Error')
        )
    })

    it('should toggle theme', () => {
        const { result } = renderHook(() => useHeaderProps())

        act(() => {
            result.current.toggleTheme()
        })

        expect(toggleThemeMock).toHaveBeenCalled()
    })
})
