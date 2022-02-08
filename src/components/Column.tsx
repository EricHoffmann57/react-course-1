import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;
const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
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
const Sort = styled.div`
  display: inline-block;
`

function Column(props) {

    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [updateTitle, setUpdatedTitle] = useState(props.column.title);
    const [activeFilter, setActiveFilter] = useState("");

    function onNewTaskButtonClick() {
        setShowNewTaskButton(false);
    }

    function handleInputChange(event) {
        setUpdatedTitle(event.target.value);
    }

    function onNewTaskInputComplete() {
        setShowNewTaskButton(true);
        setUpdatedTitle(updateTitle);
        console.log(updateTitle)
    }


    function deleteColumn(columnId, index) {
        const columnTasks = props.state.columns[columnId].taskIds;

        const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
            const {[currentValue]: oldTask, ...newTasks} = previousValue;
            return newTasks;
        }, props.state.tasks);

        const columns = props.state.columns;
        const {[columnId]: oldColumn, ...newColumns} = columns;

        const newColumnOrder = Array.from(props.state.columnOrder);
        newColumnOrder.splice(index, 1);

        props.setState({
            tasks: {
                ...finalTasks
            },
            columns: {
                ...newColumns
            },
            columnOrder: newColumnOrder
        });
    }

    function editTitle(columnId, index) {
        const column = props.state.columnOrder[index]
        setShowNewTaskButton(false);
        setUpdatedTitle(updateTitle)
        console.log(column)
    }

    const searchText = (e) => {
        setActiveFilter(e.target.value);
    }
    let dataSearch = props.tasks.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(activeFilter.toString().toLowerCase())
        )
    });
    return (

        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>
                        {updateTitle}
                        {showNewTaskButton ?
                            <ButtonE onClick={() => editTitle(props.columnId, props.index)}> Edit</ButtonE> :
                            <div>
                                <input type="text" value={updateTitle} onChange={handleInputChange}/>
                                <button type={"submit"} onClick={onNewTaskInputComplete}>Submit</button>
                            </div>
                        }
                        <Button onClick={() => deleteColumn(props.column.id, props.index)}> X</Button>
                    </Title>
                    Filter tasks: <input type="text" value={activeFilter} onChange={searchText}/>
                    <Sort>
                    </Sort>
                    <Droppable droppableId={props.column.id} type="task">
                        {provided => (
                            <TaskList tasks={props.state.dataCopy}
                                      handleBtns={props.handleBtns}{...provided.droppableProps} ref={provided.innerRef}
                                      setTasks={props.setState}>
                                {
                                    dataSearch.map((task, index) =>
                                        (<Task key={task.id} task={task} index={index} columnId={props.column.id}
                                               state={props.state} setState={props.setState}/>)
                                    )
                                }
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                    <AddTask columnId={props.column.id} state={props.state} setState={props.setState}/>
                </Container>
            )}
        </Draggable>
    )
}

export default Column;
