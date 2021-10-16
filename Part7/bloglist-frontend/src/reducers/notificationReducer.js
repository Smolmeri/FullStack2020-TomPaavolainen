const reducer = (state = null, action) => {
    swtich (action.type) {
        case 'SET_NOTE':
            return action.data
        case 'HIDE':
            return null
        default: return state
    }
}

export const setNotification = (content, timer) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTE',
            data: content
        })

        await new Promise(resolve => window.setTimeout(resolve, timer * 1000))

        dispatch({
            type: 'HIDE'
        })
    }
}

export default reducer