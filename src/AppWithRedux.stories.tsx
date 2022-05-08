import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import {within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {decorators} from "@storybook/addon-links/dist/ts3.9/preset/addDecorator";
import {ReduxProviderDecorator} from "./state/ReduxProviderDecorator";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
decorators:[ReduxProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>;

export const AppWithReduxStory = Template.bind({})

//AppWithReduxStory.args = {

//
