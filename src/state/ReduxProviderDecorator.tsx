import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType, store} from '../app/store'
import {Story} from "@storybook/react";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate:'', order:2},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate:'', order:2}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {id: v1(), title: "JS", status: TaskStatuses.Completed,description:'', completed:true, priority:TaskPriorities.Low,addedDate:'',deadline:'',order:2,startDate:'',todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,description:'', completed:true, priority:TaskPriorities.Low,addedDate:'',deadline:'',order:2,startDate:'',todoListId: 'todolistId2'},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed,description:'', completed:true, priority:TaskPriorities.Low,addedDate:'',deadline:'',order:2,startDate:'',todoListId: 'todolistId1'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
export const ReduxProviderDecorator = (StoryFn: Story) => {
    return (

        <Provider store={storyBookStore}><StoryFn/></Provider>

    );
};

