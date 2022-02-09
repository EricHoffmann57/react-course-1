import React, {useState} from "react";


function AddColumn(props:
                       {
                           state:
                               {
                                   columnOrder: Iterable<string> | ArrayLike<string>;
                                   columns: {};
                               };
                           setState: (arg0: string | {} ) => void;
                       }) {
    const [showNewColumnButton, setShowNewColumnButton] = useState<boolean>(true);
    const [value, setValue] = useState<string>("");

    function handleInputChange(event: { target: { value: React.SetStateAction<string>; }; }) {
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

    function addNewColumn(title: string) {
        const newColumnOrder:Array<string> = Array.from(props.state.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
        newColumnOrder.push(newColumnId);

        const newColumn:object = {
            id: newColumnId,
            title: title,
            taskIds: Array<string>()
        };
        if (newColumn["title"] !== "") {
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
