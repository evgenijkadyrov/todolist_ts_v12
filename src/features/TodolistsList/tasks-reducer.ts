import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from './todolists-reducer';
import {TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../api/app-reducer";
import {TasksStateType} from "../../app/AppWithRedux";
import {AxiosError} from "axios";
import {handlerAppError, handlerError} from "../../utils/utils-error";

const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state};
            action.todolists.forEach(t => copyState[t.id] = [])
            return copyState;
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}
//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'CHANGE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

/*export enum resultStatus {
    'idle',
    'loading',
    'succeed'
}*/

//thunks
export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('idle'))
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(setAppStatusAC('idle'))
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('idle'))
            } else {
                handlerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handlerError(dispatch, error.message)
        })

}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        return console.log('Error')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...domainModel
    }
    dispatch(setAppStatusAC('loading'))
    todoListAPI.updateTask(todolistId, taskId, apiModel)
        .then((res) => {
            dispatch(setAppStatusAC('idle'))
            dispatch(changeTaskAC(taskId, domainModel, todolistId))
        })
}

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
export type SetTasksTypeAT = ReturnType<typeof setTasksAC>

export type TasksActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsAT | SetTasksTypeAT
    | AppActionsType
