import React from 'react'
import { useSearchThemeContext } from '../../context'
import './SubHeader.css'

export const Subheader: React.FC = () => {
    const { totalPackages, theme } = useSearchThemeContext()

    return (
        <>
            {totalPackages > 0 ? (
                <div className={`subheader ${theme}`}>
                    <h2>{totalPackages} Packages Found</h2>
                </div>
            ) : null}
        </>
    )
}

export default Subheader
