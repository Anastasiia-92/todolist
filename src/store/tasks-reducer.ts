import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todoLists-reducer";


type removeTaskAT = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}
type addTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}
type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todoListID: string
}

export type ActionUnionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

let initialState: TaskStateType = {}


export const tasksReducer = (state = initialState, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK":
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID]: [newTask,...state[action.todoListID]]};
        case "CHANGE-TASK-STATUS": {
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDoneValue} : t)
        }
            return {...state};
        case "CHANGE-TASK-TITLE": {
            state[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            return {...state}
        }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            };
        case "REMOVE-TODOLIST":
                delete state[action.todoListID]
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): removeTaskAT => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): addTaskAT => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, newIsDoneValue, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
}