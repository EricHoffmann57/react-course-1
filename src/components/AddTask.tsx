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

function AddTask(props:
                     { columnId: string;
                         state: { columns: {} ;
                             tasks: {};
                         };
                         setState: (arg0: string | {}) => void;
                     }) {
    const [showNewTaskButton, setShowNewTaskButton] = useState<boolean>(true);
    const [value, setValue] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);


    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }

    function handleInputChange(event: { target: { value: React.SetStateAction<string>; }; }) {
        setValue(event.target.value);
    }
    function handleInputChangeDesc(event: { target: { value: React.SetStateAction<string>; }; }) {
        setDescription(event.target.value);
    }
    function handleInputChangePriority(event: { target: { value: React.SetStateAction<string>; }; }) {
        setPriority(event.target.value);
    }
    function handleInputChangeAssignedTo(event: { target: { value: React.SetStateAction<string>; }; }) {
        setAssignedTo(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        addNewTask(props.columnId, value, description, priority, assignedTo, completed);
        setValue("");
        setDescription("");
        setPriority("");
        setAssignedTo("");
        setCompleted(false)
    }

    function addNewTask(columnId: string, title: string, description: string, priority: string, assignedTo: string, completed: boolean) {
        const newTaskId = nextId();
        const column = props.state.columns[columnId];
        const newTaskIds:Array<string> = Array.from(column.taskIds);
        newTaskIds.push(newTaskId);

       const newTask:object = {
            id: newTaskId,
            title: title,
            description: description,
            priority: priority,
            assignedTo: assignedTo,
            completed: completed
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
