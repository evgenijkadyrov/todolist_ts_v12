import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {action} from "@storybook/addon-actions";
import {AddItemForm} from "../components/addItemForm/AddItemForm";


export default {
    title: 'AddItemForm',
    component: AddItemForm,

    argTypes: {
       addItem:{
           description :'callback'
       }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({})

AddItemFormExample.args = {
    addItem: action('button clicked inside form')
}
