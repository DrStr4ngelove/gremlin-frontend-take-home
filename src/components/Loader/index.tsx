import React from 'react'
import { LoaderProps } from '../types'
import './Loader.css'

const Loader: React.FC<LoaderProps> = ({ size = 40, color = 'blue' }) => {
    return (
        <div
            role="presentation"
            className="loader"
            style={{
                width: size,
                height: size,
                borderColor: color,
                borderTopColor: 'transparent',
            }}
        />
    )
}

export default Loader
