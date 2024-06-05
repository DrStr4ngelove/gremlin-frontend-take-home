import { ResultItemProps, ResultItem } from '../types'
import { useSearchThemeContext } from '../../context'

export const useResultItemProps = (props: ResultItemProps): ResultItem => {
    const { result } = props
    const { theme } = useSearchThemeContext()
    // format result
    const formattedResult = {
        name: result?.package?.name || '',
        description: result?.package?.description || '',
        version: result?.package?.version || '',
        score: result?.package?.searchScore || 0,
        author: result?.package?.author?.name || '',
        link: result?.package?.links?.npm || '',
    }
    return { formattedResult, theme }
}
