import {todoListAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {AppActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../api/app-reducer";
import {action} from "@storybook/addon-actions";
import {addTaskAC} from "./tasks-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all',entityStatus:'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(t => ({...t, filter: 'all',entityStatus:'idle'}))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(t=>t.id===action.todolistId?{...t, entityStatus:action.entityStatus}:t)
        default:
            return state;
    }
}
//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const changeTodolistEntityStatusAC=(entityStatus:RequestStatusType, todolistId:string)=>({type:'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, todolistId}as const)

//thunks
/*export const fetchTodolistsTC = ():AppThunk => {
    return (dispatch) => {
        todoListAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data))
            })
    }
}*/
//thunk on async await
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListAPI.getTodolists()
        dispatch(setAppStatusAC('idle'))
        dispatch(setTodolistAC(res.data))

    } catch (e) {
        console.log(e)
    }
}
/*export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todoListAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}*/
//thunk on async await
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC('loading',todolistId))
        const res = await todoListAPI.deleteTodolist(todolistId)
        dispatch(setAppStatusAC('idle'))
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {
        console.log(e)
    }
}

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {

        dispatch(setAppStatusAC('loading'))
        todoListAPI.createTodoList(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('idle'))

                } else {
                    dispatch(setAppStatusAC('failed'))
                    dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : 'Some error'))
                }
                           })
    }
}
export const updateTotolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListAPI.updateTodoList(todolistId, title)
            .then((res) => {
                dispatch(setAppStatusAC('idle'))
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistAC>
export type ChangeEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus:RequestStatusType
}

export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsAT
    | AppActionsType
|ChangeEntityStatusAT
