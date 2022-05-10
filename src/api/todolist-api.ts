import axios from 'axios'


const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY': '9b72f4ba-907c-4951-9e60-9983c0732b39'
    }
})
export type TodolistType={
    id:string,
    title:string,
    addedDate:string,
    order:number
}

export type  ResponseType<D={}>={
    data: D,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export enum TaskStatuses {
   New,
   InProgress,
   Completed,
   Draft
}
export enum TaskPriorities{
    Low,
    Middle,
    Hi,
    Urgentli,
    Later
}
export type TaskType={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id:string
    todoListId: string
    order: number
    addedDate: string
}


export type GetTasksTypeResponse={
    error:string
    totalCount:number
    items:Array<TaskType>
}
export type UpdateTaskModelType={
    title: string
    description: string

    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todoListAPI={
    updateTodoList(todolistId:string, title:string){
        const promise=
            instance.put<ResponseType<{item:TodolistType}>>(`todo-lists/${todolistId}`,{title})
               return promise
    },
    getTodolists(){
        const promise=instance.get<TodolistType[]>('todo-lists')
        return promise
    },
    createTodoList(title:string){
        const promise=instance.post<ResponseType<{items:TodolistType}>>('todo-lists',{title})
        return promise
    },
    deleteTodolist(todolistId:string){
        const promise=instance.delete<ResponseType<{item:TodolistType}>>(`todo-lists/${todolistId}`)
        return promise
    },
    getTasks(todolistsId:string ){
        const promise=instance.get<GetTasksTypeResponse>(`todo-lists/${todolistsId}/tasks`)
        return promise
    },
    createTask(todolistId:string,title:string){
        const promise=instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`,{title})
        return promise
    },
    updateTask(todolistId:string, taskId:string,  model:UpdateTaskModelType){
        const promise=instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,model)
        return promise
    },
    deleteTask(todolistId:string,taskId:string){
        const promise=instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}