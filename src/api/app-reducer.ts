import {authAPI} from "./todolist-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handlerAppError, handlerError} from "../utils/utils-error";
import {AxiosError} from "axios";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':

            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized
} as const)
type setAppErrorAT = ReturnType<typeof setAppErrorAC>
type setAppStatusAT = ReturnType<typeof setAppStatusAC>
type setAppIsInitializedAT = ReturnType<typeof setAppIsInitializedAC>
export type AppActionsType = setAppStatusAT | setAppErrorAT | setAppIsInitializedAT

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))

        } else {
            handlerAppError(dispatch, res.data)

        }
    })
        .catch((error: AxiosError) => {
            handlerError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppIsInitializedAC(true))
        })
}


