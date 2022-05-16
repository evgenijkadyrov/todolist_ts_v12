import React, {useEffect, useState} from 'react'
import {todoListAPI} from "./todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9b72f4ba-907c-4951-9e60-9983c0732b39'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodoList('Thats again i am')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '30f24a83-f7fa-42ca-85ec-1dbcdbbe00f3'
        todoListAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '83b946fd-967e-4816-a0ed-1237db7036af'
        todoListAPI.updateTodoList(todolistId, 'Refactor good')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7dee45bd-39ce-45a3-8e01-87052c9fd6eb'
        todoListAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
            }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateNewTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='7dee45bd-39ce-45a3-8e01-87052c9fd6eb'
        todoListAPI.createTask(todolistId,'New Task')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='7dee45bd-39ce-45a3-8e01-87052c9fd6eb'
        const taskId='e13ec845-9246-4769-ab11-6c9662e6624d'
        todoListAPI.updateTask(todolistId,taskId,{
            title: 'Refactor task',
            description: 'hhh',

            status: 0,
            priority: 2,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7dee45bd-39ce-45a3-8e01-87052c9fd6eb'
        const taskId = 'f9eb3cf6-2680-400f-98de-c1d251826ddd'
        todoListAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

