import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";



export  type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ],
            [todoListID_2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Butter", isDone: true},
                {id: v1(), title: "Meat", isDone: false},
            ]
        }
    )

    //Tasks:

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks})
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks({...tasks})
    }

    //todoLists:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


//UI:
    function getTasksForToDoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                <Paper elevation={2}>
                    <ToDoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForToDoList(tl)}
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
                        <Menu />
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

export default App;
