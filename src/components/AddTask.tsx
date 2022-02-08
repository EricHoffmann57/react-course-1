import React, {useState} from 'react';
import styled, {css} from "styled-components";
import nextId from "react-id-generator";

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
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [assignedTo, setAssignedTo] = useState("");


    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }

    function handleInputChange(event) {
        setValue(event.target.value);
    }
    function handleInputChangeDesc(event) {
        setDescription(event.target.value);
    }
    function handleInputChangePriority(event) {
        setPriority(event.target.value);
    }
    function handleInputChangeAssignedTo(event) {
        setAssignedTo(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        addNewTask(props.columnId, value, description, priority, assignedTo);
        setValue("");
        setDescription("");
        setPriority("");
        setAssignedTo("");
    }

    function addNewTask(columnId, title, description, priority, assignedTo) {
        const newTaskId = nextId();

        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.push(newTaskId);

        const newTask = {
            id: newTaskId,
            title: title,
            description: description,
            priority: priority,
            assignedTo: assignedTo,
            completed: false
        }
        const isValidTask = Object.keys(newTask).reduce((res, k) => res && (!!newTask[k] || newTask[k] === false || !isNaN(parseInt(newTask[k]))), Object.keys(newTask).length > 0)
        if (isValidTask) {
            props.setState({
                ...props.state,
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
        }else{
            alert('All fields ar required!')
        }
    }
    return (
        <div>

            {
                showNewTaskButton ?
                    <Button onClick={onNewTaskButtonClick}>New task</Button> :
                    <div>
                        <label>Title
                            <input type="text" name="title" value={value} onChange={handleInputChange}
                                /><br/>
                        </label>
                        <label>Description
                            <input type="text" name="description" value={description}
                                   onChange={handleInputChangeDesc}
                            />
                        </label><br />
                        <label>Priority
                            <input type="text" name="priority" value={priority}
                                   onChange={handleInputChangePriority}
                            />
                        </label><br />
                        <label>Assigned to
                            <input type="text" name="assignedTo" value={assignedTo}
                                   onChange={handleInputChangeAssignedTo}
                            />
                        </label><br />
                        <button type={"submit"} onClick={onNewTaskInputComplete}>Submit</button>
                    </div>
            }



        </div>
    )
}

export default AddTask;
