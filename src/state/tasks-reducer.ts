import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT} from './todolists-reducer';
import {TaskType, todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
   task:TaskType
}

export type ChangeTaskActionType = {
    type: 'CHANGE-TASK',
    todolistId: string
    taskId: string
    model:UpdateDomainTaskModelType
}
/*
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}*/
export type SetTasksTypeAT={
    type:'SET-TASKS'
    tasks:Array<TaskType>
    todolistId:string
}
type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskActionType
   /* | ChangeTaskTitleActionType*/
    | AddTodolistActionType
    | RemoveTodolistActionType
|SetTodolistsAT|SetTasksTypeAT

const initialState: TasksStateType = {
    count: []
}
export type UpdateDomainTaskModelType={
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t);
            return ({...state});
        }
       /* case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }*/
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS":{
            const copyState = {...state};
          action.todolists.forEach(t=>copyState[t.id]=[])
            return copyState;
        }
        case "SET-TASKS":{
            const copyState = {...state};
            copyState[action.todolistId]=action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskAC = (taskId: string, model:UpdateDomainTaskModelType, todolistId: string): ChangeTaskActionType => {
    return {type: 'CHANGE-TASK', model, todolistId, taskId}
}
/*export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}*/
export const setTasksAC=(tasks:Array<TaskType>,todolistId:string):SetTasksTypeAT=>{
    return {type:'SET-TASKS',tasks, todolistId}
}
export const fetchTaskTC=(todolistId:string)=>{
    return (dispatch:Dispatch)=>{
        todoListAPI.getTasks(todolistId)
            .then(res=>{
                dispatch(setTasksAC(res.data.items,todolistId ))
            })
    }
}

export const removeTaskTC=(todolistId:string,taskId:string)=>{
    return (dispatch:Dispatch)=>{
        todoListAPI.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(removeTaskAC(taskId,todolistId))
            })
    }
}
export const addTaskTC=(todolistId:string, title:string)=>{
    return (dispatch:Dispatch)=>{
        todoListAPI.createTask(todolistId, title)
            .then((res)=>{
                const task=res.data.data.item
                const action=addTaskAC(task)
                dispatch(action)
            })
    }
}
/*export const updateTaskTitleTC=(id:string, newTitle:string, todolistId:string)=>{
    return (dispatch:Dispatch, getState:()=>AppRootStateType)=>{
        const state=getState()
        const task=state.tasks[todolistId].find(t=>t.id===id)
        if(!task){
            return
        }
        const model:UpdateTaskModelType={
            deadline:task.deadline,
            description:task.description,
            priority: task.priority,
            startDate:task.startDate,
            status:task.status,
            title:newTitle

        }
        todoListAPI.updateTask(id,newTitle,model)
            .then((res)=>{
                dispatch(changeTaskTitleAC(id,newTitle,todolistId))
            })
    }
}*/
export const updateTaskTC=(taskId:string, domainModel:UpdateDomainTaskModelType, todolistId:string)=>{
    return (dispatch:Dispatch,getState:()=>AppRootStateType)=>{
        const state=getState()
        const task=state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            return console.log('Error')
        }
        const apiModel:UpdateTaskModelType={
            title:task.title,
            status:task.status,
            startDate:task.startDate,
            priority:task.priority,
            description:task.description,
            deadline:task.deadline,
            ...domainModel
        }
todoListAPI.updateTask(todolistId,taskId,apiModel)
    .then((res)=>{

        dispatch(changeTaskAC(taskId,domainModel,todolistId))
    })
    }
}