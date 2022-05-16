import {todoListAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(t => ({...t, filter: 'all'}))
        }
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
//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListAPI.createTodoList(title)
            .then((res) => {
                const newTodolist = res.data.data.item
                dispatch(addTodolistAC(newTodolist))
            })
    }
}
export const updateTotolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todoListAPI.updateTodoList(todolistId, title)
            .then((res) => {
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

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsAT
