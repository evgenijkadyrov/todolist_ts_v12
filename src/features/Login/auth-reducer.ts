import {Dispatch} from 'redux'
import {AppActionsType, setAppStatusAC} from "../../api/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handlerAppError, handlerError} from "../../utils/utils-error";
import {AxiosError} from "axios";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data).then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('idle'))
            } else {
                handlerAppError(dispatch, res.data)
            }
        })
            .catch((error: AxiosError) => {
                handlerError(dispatch, error.message)
            })

    }

}

export const logoutTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout().then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('idle'))
            } else {
                handlerAppError(dispatch, res.data)
            }
        })
            .catch((error: AxiosError) => {
                handlerError(dispatch, error.message)
            })

    }

}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType
