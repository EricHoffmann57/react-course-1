import React, {useEffect, useRef, useState} from "react";
import {Draggable} from 'react-beautiful-dnd';
import styled, {css} from 'styled-components';


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${props =>
          props.primary &&
          css`
            background: palevioletred;
            color: white;
          `};
`
const ButtonE = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #70d2db;
  color: #70b6db;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${props =>
          props.primary &&
          css`
            background: #70dbcf;
            color: white;
          `};
`


function Task(props) {

    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [updateTitle, setUpdateTitle] = useState(props.task.title);
    const [updateDesc, setUpdateDesc] = useState(props.task.description);
    const [updatePriority, setUpdatePriority] = useState(props.task.priority);
    const [updateAssignedTo, setUpdateAssignedTo] = useState(props.task.assignedTo);
    const [isChecked, setIsChecked] = useState(props.task.completed);
    const [editingId, setEditingId] = useState(null);


    const title = useRef()
    const description = useRef()
    const priority = useRef()
    const assignedTo = useRef()
    useEffect(() => {
        props.task.title = updateTitle;
        props.task.description = updateDesc;
        props.task.priority = updatePriority;
        props.task.assignedTo = updateAssignedTo;
    });

    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }
    function handleInputChangeTitle(event) {
        setUpdateTitle(event.target.value);
    }
    function handleInputChangeDesc(event) {
        setUpdateDesc(event.target.value);
    }
    function handleInputChangePriority(event) {
        setUpdatePriority(event.target.value);
    }
    function handleInputChangeAssignedTo(event) {
        setUpdateAssignedTo(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        setUpdateTitle(updateTitle);
        setUpdateDesc(updateDesc);
        setUpdatePriority(updatePriority);
        setUpdateAssignedTo(updateAssignedTo);
    }

    const handleOnChangeStatus = () => {
        props.task.completed = !props.task.completed
        setIsChecked(!isChecked);
    };


    function deleteTask(columnId, index, taskId) {
        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(index, 1);
        taskId = props.state.tasks[index]
        const tasks = props.state.tasks;
        const {[taskId]: oldTask, ...newTasks} = tasks;

        props.setState({
            ...props.state,
            tasks: {
                ...newTasks
            },
            columns: {
                ...props.state.columns,
                [columnId]: {
                    ...column,
                    taskIds: newTaskIds
                }
            }
        });
    }


    function editTask(columnId, taskId, index) {
        const column = props.state.columns[columnId];
        const taskIds = Array.from(column.taskIds);
        console.log(taskIds)
        taskId = props.state.tasks[index]
        setShowNewTaskButton(false);
        console.log(taskId)
    }

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                           isEditing={editingId === props.task.id}
                           setEditingId={setEditingId}
                >
                   <article id={props.task.id}
                            style={{padding:10, backgroundColor: isChecked ? '#A8E2BCFF' : '#dddddd' }}

                   >
                    <h3
                        style={{ textDecoration: isChecked ? "line-through" : null }}
                    >Title: {updateTitle}
                        <input type="checkbox" value={props.task.completed}
                               checked={isChecked}
                               onChange={handleOnChangeStatus}
                               style={{ height: 30,width:30}}
                        />
                    </h3><br />
                    <p>Description: {updateDesc}</p><br />
                    <h4>Priority: {updatePriority}</h4><br />
                    <h4>Assigned to: {updateAssignedTo}</h4><br />
                    <p>Completed : {isChecked.toString()}</p>
                    {showNewTaskButton ?
                        <ButtonE
                            onClick={() => editTask(props.columnId, props.index, props.task.id)}> Edit</ButtonE> :
                        <div>
                            <input type="text" ref={title} value={updateTitle} onChange={handleInputChangeTitle}/><br />
                            <input type="text" ref={description} value={updateDesc} onChange={handleInputChangeDesc}/><br />
                            <input type="text" ref={priority} value={updatePriority} onChange={handleInputChangePriority}/><br />
                            <input type="text" ref={assignedTo} value={updateAssignedTo} onChange={handleInputChangeAssignedTo}/><br />

                            <button type={"submit"} onClick={onNewTaskInputComplete}>Submit</button>
                        </div>
                    }
                    <Button onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> X</Button>
                   </article>
                </Container>
            )}
        </Draggable>
    )
}

export default Task;
