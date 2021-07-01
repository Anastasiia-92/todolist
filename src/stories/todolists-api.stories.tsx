import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi, UpdateTaskPropertiesType} from "../api/todolist-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistApi.getTodoList()
            .then((res) => setState(res.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist( "What to buy")
            .then(res => setState(res.data))


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.deleteTodolist("29ff9810-2a56-4fac-859a-4b4f48c4e28c")
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.updateTodolistTitle("cc4ebb02-a40a-40d8-b58f-2995ae746ac7", "11111")
            .then(res => setState(res.data))
    }, [])


    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistApi.getTasks("42a6043c-b6ee-4200-be3d-1682ac362dfd")
            .then((res) => setState(res.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistApi.createTask("a748866a-d632-4390-b32e-5e0fd79d3772", "HTML")
            .then((res) => setState(res.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    let taskId = '6dd977ba-d2cc-40f7-934a-ab78552f84a6'
    let todolistId = 'fbe817fe-5ef2-4b0a-b6de-77c35859b66c'

    // useEffect(() => {
    //     todolistApi.deleteTask(todolistId, taskId)
    //         .then((res) => {
    //             setState(res)
    //         })
    //         .catch(err => console.log(err))
    // }, [])
const deleteTask = () => {
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {

            setState(res.data)
        })
        .catch(err => console.log(err))
}
    return <div>
        <button onClick={deleteTask}>Delete </button>
        {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    let taskId = '971bceed-cf3f-4076-bd2f-b96e6736ae83'
    let todolistId = 'fbe817fe-5ef2-4b0a-b6de-77c35859b66c'
    useEffect(() => {

        todolistApi.updateTask(todolistId, taskId,  "New Title")
            .then((res) => setState(res.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}