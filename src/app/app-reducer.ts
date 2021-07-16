export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null

}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


export let setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export let setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export type SetAppStatusActionType =
    | ReturnType<typeof setAppStatusAC>
    | SetAppErrorActionType

type ActionsType = SetAppStatusActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
