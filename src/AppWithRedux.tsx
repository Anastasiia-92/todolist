import React, {useCallback} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/ store";


export  type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {
//BLL:

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    //Tasks:

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string)=> {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string)=> {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

    //todoLists:

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string)=> {
        dispatch(ChangeFilterAC(value, todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string)=> {
        dispatch(ChangeTodoListTitleAC(title, todoListID))
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    },[dispatch]);

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch]);


//UI:

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={2}>
                        <ToDoList
                            todoListID={tl.id}
                            title={tl.title}
                            // tasks={getTasksForToDoList(tl)}
                            tasks={tasks[tl.id]}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoList
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}>
                        Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )

}

export default AppWithRedux;
