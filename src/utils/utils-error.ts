import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../api/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handlerError=(dispatch:Dispatch<AppActionsType>,message:string)=>{
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('idle'))
}
export const handlerAppError=<T>(dispatch:Dispatch<AppActionsType>, data:ResponseType<T>)=>{
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error'))
}