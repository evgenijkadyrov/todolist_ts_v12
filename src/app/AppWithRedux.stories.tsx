import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import AppWithRedux from "./AppWithRedux";
import {ReduxProviderDecorator} from "../state/ReduxProviderDecorator";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
decorators:[ReduxProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;


const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>;

export const AppWithReduxStory = Template.bind({})

//AppWithReduxStory.args = {

//
