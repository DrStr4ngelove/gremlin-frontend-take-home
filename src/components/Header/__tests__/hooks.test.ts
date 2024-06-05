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
    let setSearchQueryMock: jest.Mock
    let setShouldBreakAPICallMock: jest.Mock

    beforeEach(() => {
        setSearchResultsMock = jest.fn()
        toggleThemeMock = jest.fn()
        setErrorMessagesMock = jest.fn()
        setSearchQueryMock = jest.fn()
        setShouldBreakAPICallMock = jest.fn()

        // Mock the return value of useSearchThemeContext
        ;(useSearchThemeContext as jest.Mock).mockReturnValue({
            toggleTheme: toggleThemeMock,
            theme: 'light',
            setSearchResults: setSearchResultsMock,
            setErrorMessage: setErrorMessagesMock,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    // it('should initialize state correctly', () => {
    //     renderHook(() => useHeaderProps())

    //     expect(setSearchQueryMock).toHaveBeenCalledWith('')
    //     expect(setShouldBreakAPICallMock).toHaveBeenCalledWith(false)
    // })

    // it('should update search query', () => {
    //     const { result } = renderHook(() => useHeaderProps())

    //     act(() => {
    //         result.current.handleSearchChange('test query')
    //     })

    //     expect(setSearchQueryMock).toHaveBeenCalledWith('test query')
    // })

    // it('should toggle checkbox state', () => {
    //     const { result } = renderHook(() => useHeaderProps())

    //     act(() => {
    //         result.current.handleCheckboxChange()
    //     })

    //     expect(setShouldBreakAPICallMock).toHaveBeenCalledWith(
    //         expect.any(Function)
    //     )
    // })

    it('should submit search and update results', async () => {
        const { result } = renderHook(() => useHeaderProps())

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ searchScore: { final: 1 } }]),
            })
        )

        await act(async () => {
            result.current.handleSearchSubmit({
                preventDefault: jest.fn(),
            } as React.FormEvent<HTMLFormElement>)
        })

        expect(setSearchResultsMock).toHaveBeenCalledWith([
            { searchScore: { final: 1 } },
        ])
    })

    it('should handle fetch error', async () => {
        const { result } = renderHook(() => useHeaderProps())

        global.fetch = jest.fn(() => Promise.reject(new Error('API Error')))

        console.error = jest.fn()

        await act(async () => {
            result.current.handleSearchSubmit({
                preventDefault: jest.fn(),
            } as React.FormEvent<HTMLFormElement>)
        })

        expect(setErrorMessagesMock).toHaveBeenCalledWith(
            'Error fetching search results'
        )
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
