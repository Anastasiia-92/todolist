import React, {useState, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan;