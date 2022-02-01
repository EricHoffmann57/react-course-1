import React, { useState } from 'react';
import styled, {css} from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #80db70;
  color: #55ac46;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
          props.primary &&
          css`
            background: #87faa0;
            color: white;
          `};
`

function AddTask(props) {
    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [value, setValue] = useState("");


    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        addNewTask(props.columnId, value);
        setValue("");
    }

    function addNewTask(columnId, content) {
        const newTaskId = 'task-' + Math.floor(Math.random() * 100000);

        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.push(newTaskId);

        const newTask = {
            id: newTaskId,
            content: content,
        }

        props.setState({...props.state,
            tasks: {
                ...props.state.tasks,
                [newTaskId]: newTask
            },
            columns: {
                ...props.state.columns,
                [columnId]: {
                    ...props.state.columns[columnId],
                    taskIds: newTaskIds
                }
            }
        });
    }

    return (
        <div>

            {
                showNewTaskButton ?
                    <Button onClick={onNewTaskButtonClick}>New</Button> :
                    <input type="text" value={value} onChange={handleInputChange} onBlur={onNewTaskInputComplete}/>

            }

            </div>
    )
}

export default AddTask;
