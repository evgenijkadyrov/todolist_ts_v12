import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";



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

    task:{id:'1',isDone:true, title:'JS'},
    todolistId:'todolist1'
}
export const TaskIsNotDone = Template.bind({})

TaskIsNotDone.args = {

    task:{id:'1',isDone:false, title:'CSS'},
    todolistId:'todolist1'

}