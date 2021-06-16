import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import {TaskType} from "./ToDoList";


export type PropsTasksType = {
    task: TaskType
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    todoListID: string
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
}

const Task = (props: PropsTasksType) => {

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListID)
    }, [props.task.id, props.todoListID, props.changeTaskTitle]);

    const removeTask = useCallback(() => props.removeTask(props.task.id, props.todoListID), [props.task.id, props.todoListID, props.removeTask]);

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
    }, [props.task.id, props.todoListID, props.changeTaskStatus])

    return (
        <li className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
            <Checkbox
                color={"primary"}
                onChange={onChangeTaskStatus}
                checked={props.task.isDone}
            />

            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>

            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
}

export default Task