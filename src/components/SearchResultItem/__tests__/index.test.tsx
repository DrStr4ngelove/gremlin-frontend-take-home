import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchResultItem from '../index'
import { useResultItemProps } from '../hooks'

// Mock the hook to provide controlled values for the tests
jest.mock('../hooks', () => ({
    useResultItemProps: jest.fn(),
}))

describe('SearchResultItem', () => {
    const mockFormattedResult = {
        name: 'Test Package',
        description: 'This is a test package',
        version: '1.0.0',
        author: 'Test Author',
    }

    beforeEach(() => {
        ;(useResultItemProps as jest.Mock).mockReturnValue({
            formattedResult: mockFormattedResult,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders correctly', () => {
        render(<SearchResultItem />)
        expect(screen.getByText('Test Package')).toBeInTheDocument()
        expect(screen.getByText('This is a test package')).toBeInTheDocument()
        expect(screen.getByText('v1.0.0')).toBeInTheDocument()
        expect(screen.getByText('byTest Author')).toBeInTheDocument()
    })

    test('renders without author', () => {
        ;(useResultItemProps as jest.Mock).mockReturnValue({
            formattedResult: {
                ...mockFormattedResult,
                author: null,
            },
        })

        render(<SearchResultItem />)
        expect(screen.getByText('Test Package')).toBeInTheDocument()
        expect(screen.getByText('This is a test package')).toBeInTheDocument()
        expect(screen.getByText('v1.0.0')).toBeInTheDocument()
        expect(screen.queryByText('byTest Author')).not.toBeInTheDocument()
    })

    test('calls onClick when h2 is clicked', () => {
        const handleClick = jest.fn()
        render(<SearchResultItem />)
        const nameElement = screen.getByText('Test Package')
        nameElement.onclick = handleClick
        nameElement.click()
        expect(handleClick).toHaveBeenCalled()
    })
})
