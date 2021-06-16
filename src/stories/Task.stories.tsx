import React from 'react';
import { Story, Meta } from '@storybook/react';
import Task, {PropsTasksType} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLISTS/Task',
  component: Task,

} as Meta;

const changeTaskStatusCallBack = action('Change status clicked')
const changeTaskTitleCallBack = action('Change title clicked')
const removeTaskCallBack = action('Remove task clicked')

const baseArg = {
  changeTaskStatus: changeTaskStatusCallBack,
  changeTaskTitle: changeTaskTitleCallBack,
  removeTask: removeTaskCallBack
}

const Template: Story<PropsTasksType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArg,
  task: {id: '1', title: 'JS', isDone: true},
  todoListID: 'todolistId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  task: {id: '2', title: 'HTML', isDone: false},
  todoListID: 'todolistId2',
  ...baseArg
}
