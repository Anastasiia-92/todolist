import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        "API-KEY": "d34caee5-ca54-4fb4-bea4-fc948b47c985"
    }
})

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number,
    fieldsErrors: string[],
    messages: string[],
    data: T
}

 export type UpdateTaskPropertiesType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistApi = {
    getTodoList() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ data: TodoType }>>('/todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }

}