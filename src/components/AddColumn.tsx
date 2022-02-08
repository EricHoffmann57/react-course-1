import React, {useState} from "react";

function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const [value, setValue] = useState("");

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function onNewColumnButtonClick() {
        setShowNewColumnButton(false);
    }

    function onNewColumnInputComplete() {
        setShowNewColumnButton(true);
        addNewColumn(value);
        setValue("");
    }

    function addNewColumn(title) {
        const newColumnOrder = Array.from(props.state.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
        newColumnOrder.push(newColumnId);

        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
        };
        if (newColumn.title !== "") {
            props.setState({
                ...props.state,
                columnOrder: newColumnOrder,
                columns: {
                    ...props.state.columns,
                    [newColumnId]: newColumn
                }
            });
        }else{
            alert('column title is required!')
        }
    }
    return (
        <div>
            {
                showNewColumnButton ?
                    <button onClick={onNewColumnButtonClick}>New Column</button> :
                    <div>
                        <input type="text" value={value} onChange={handleInputChange}/>
                        <button type={"submit"} onClick={onNewColumnInputComplete}>Add</button>
                    </div>
            }

        </div>
    )
}

export default AddColumn;
