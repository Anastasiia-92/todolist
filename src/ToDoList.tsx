import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import Task from "./Task";

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

const ToDoList = React.memo((props: PropsType) => {
    console.log("ToDoList")

    const getTasksForToDoList = (filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }
    let tasksForToDoList = getTasksForToDoList(props.filter);

    const onClickAllFilter = useCallback(() =>
        props.changeFilter('all', props.todoListID),
        [props.changeFilter, props.todoListID]);

    const onClickActiveFilter = useCallback(() =>
        props.changeFilter('active', props.todoListID),
        [props.changeFilter, props.todoListID]);

    const onClickCompletedFilter = useCallback(() =>
        props.changeFilter('completed', props.todoListID),
        [props.changeFilter, props.todoListID]);

    const onClickRemoveTodoList = useCallback(() =>
        props.removeTodoList(props.todoListID),
        [props.changeFilter, props.todoListID]);

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.todoListID),
        [props.addTask, props.todoListID]);

    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.todoListID),
        [props.changeFilter, props.todoListID]);


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
                    {
                        tasksForToDoList.map(t => {
                            return (<Task
                                    key={t.id}
                                    task={t}
                                    changeTaskTitle={props.changeTaskTitle}
                                    filter={props.filter}
                                    todoListID={props.todoListID}
                                    removeTask={props.removeTask}
                                    changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        })
                    }

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
})

export default ToDoList