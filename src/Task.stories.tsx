import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";


import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";



export default {
    title: 'Task',
    component: Task,

    args:{
        changeTaskStatus: action('status changed'),
        changeTaskTitle: action('title has changed'),
        removeTask:action('task has removed'),
    }

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({})

TaskIsDone.args = {

    task:{id:'1',status: TaskStatuses.Completed, title:'JS',description:'', completed:true, priority:TaskPriorities.Low,addedDate:'',deadline:'',order:2,startDate:'',todoListId: 'todolist1'},
    todolistId:'todolist1'
}
export const TaskIsNotDone = Template.bind({})

TaskIsNotDone.args = {

    task:{id:'1',status:TaskStatuses.Completed, title:'CSS',description:'', completed:true, priority:TaskPriorities.Low,addedDate:'',deadline:'',order:2,startDate:'',todoListId: 'todolist1'},
    todolistId:'todolist1'

}