import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Loader from '../index'

describe('Loader Component', () => {
    test('renders with default props', () => {
        render(<Loader />)
        const loaderElement = screen.getByRole('presentation')
        expect(loaderElement).toBeInTheDocument()
        expect(loaderElement).toHaveStyle({
            width: '40px',
            height: '40px',
            borderColor: 'blue',
            borderTopColor: 'transparent',
        })
    })

    test('renders with custom size and color', () => {
        const size = 60
        const color = 'red'
        render(<Loader size={size} color={color} />)
        const loaderElement = screen.getByRole('presentation')
        expect(loaderElement).toBeInTheDocument()
        expect(loaderElement).toHaveStyle({
            width: `${size}px`,
            height: `${size}px`,
            borderColor: color,
            borderTopColor: 'transparent',
        })
    })
})
