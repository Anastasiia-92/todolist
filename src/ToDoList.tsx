import React from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function ToDoList(props: PropsType) {

    const tasks = props.tasks.map(t => {
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID)
        }
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        return (
            <li className={t.isDone ? "is-done" : ""} key={t.id}>
                <Checkbox
                    color={"primary"}
                    onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}
                    checked={t.isDone}
                />

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const onClickAllFilter = () => props.changeFilter('all', props.todoListID)
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID)
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton onClick={onClickRemoveTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>

                <ul style={{listStyle: "none", paddingLeft: "0"}}>
                    {tasks}
                </ul>
                <div>
                    <Button
                        size={"small"}
                        variant={props.filter === "all" ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onClickAllFilter}>All
                    </Button>
                    <Button
                        size={"small"}
                        style={{marginLeft: "5px"}}
                        variant={props.filter === "active" ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button
                        size={"small"}
                        style={{marginLeft: "5px"}}
                        variant={props.filter === "completed" ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ToDoList