import { useState } from 'react'
import { HeaderProps } from '../types'
import { useSearchThemeContext } from '../../context'

export const useResultItemProps = ({ result }: any) => {
    const { theme } = useSearchThemeContext()
    // format result
    const formattedResult = {
        name: result?.package?.name || '',
        description: result?.package?.description || '',
        version: result?.package?.version || '',
        score: result?.searchScore?.final || '',
        author: result?.package?.author?.name || '',
    }
    return { formattedResult, theme }
}
