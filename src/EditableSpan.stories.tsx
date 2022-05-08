import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {action} from "@storybook/addon-actions";

import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan,

    argTypes: {
        onChange: {
            description: 'callback'
        }
    }

} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({})

EditableSpanExample.args = {
    value: 'hghghg',
    onChange: action('span changed')
}
