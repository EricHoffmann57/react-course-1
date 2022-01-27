import React, { useState } from "react"
import {List} from './List';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import {Card} from "./Card";
import _ from 'lodash'
import './App.css'





const cards = [
    {
        id: "1",
        name: "Todo List React",
        description: "todo1",
    },
    {
        id: "2",
        name: "Project Flutter",
        description: "todo2",
    },
    {
        id: "3",
        name: "Play Symfony",
        description: "todo3",
    },
    {
        id: "4",
        name: "Magento ou tard",
        description: "todo4",
    }
]


const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    width: `90%`,
    margin: `.5em auto`,
    background: isDragging ? "#4a2975" : "lightblue",
    color: isDragging ? "white" : "black",
    border: `1px solid black`,
    fontSize: `20px`,
    borderRadius: `5px`,

    ...draggableStyle
})

const listItems = [
    {
        id: '0',
        title: 'Todo',
        items: cards,
    },
    {
        id: '1',
        title: 'In progress',
        items: [],
        },
    {
        id: '2',
        title: 'Done!',
        items: [],
    }
]

function App() {
    const [ todo, setTodo ] = useState(listItems)


    const onDragEn =  (result: DropResult) => {
       const {destination, source}  = result
        if (!destination) return

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = {...todo[source.droppableId].items[source.index]}

        setTodo(prev => {
            prev = {...prev}
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }

        return (
            <div className="App">
                <DragDropContext onDragEnd={onDragEn}>
                    { _.map(todo, (data:any, key:any) => {
                        return (
                            <div key={key} className={"column"}>
                                <h3>{data.title}</h3>
                                <Droppable droppableId={key}>
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={"droppable-col"}
                                            >
                                                {data.items.map((elt:any, index:any) => {
                                                    return (

                                                        <Draggable key={elt.id} draggableId={elt.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                                >
                                                                    {elt.name}<br />
                                                                    {elt.description}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }}

                                </Droppable>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        )
    }

export default App
