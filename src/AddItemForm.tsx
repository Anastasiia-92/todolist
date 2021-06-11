import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";
import {TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

 const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    // const errorMessage = error ? <div>Title is required!</div> : null

    return (
        <div>
            <TextField
                variant={"outlined"}
                error={error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                helperText={error && "Title is required!"}
                onBlur={() => setError(false)}
            />

            <IconButton onClick={onClickAddItem} color={"primary"}>
                <AddBox/>
            </IconButton>

        </div>
    )
})

export default AddItemForm;