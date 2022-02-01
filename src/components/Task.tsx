import React, {useEffect, useRef, useState} from "react";
import {Draggable} from 'react-beautiful-dnd';
import styled, {css} from 'styled-components';


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
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
    const [update, setUpdate] = useState([...props.task.content]);

    const content= useRef()
    useEffect(() => {
        props.task.content = update;
    });
    // @ts-ignore
    const handleClick = () => setUpdate(content.current.value);


    let [isEditItem, setIsEditItem] = useState(null)


    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }

    function handleInputChange(event) {
        setUpdate(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        setUpdate(update);
    }

    function deleteTask(columnId, index, taskId) {
        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(index, 1);

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

        console.log(update)
        console.log(taskId)
        setShowNewTaskButton(false);
        setUpdate(update)
        console.log(update)
        setIsEditItem(taskId.id)
    }

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <h3>{update}</h3>
                    {showNewTaskButton ?
                        <ButtonE onClick={() => editTask(props.columnId, props.index,props.task.id)}> Edit</ButtonE> :
                        <input type="text" ref={content} value={update} onChange={handleClick} onBlur={onNewTaskInputComplete}/>
                    }
                    <Button onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> X</Button>
                </Container>
            )}
        </Draggable>
    )
}

export default Task;


