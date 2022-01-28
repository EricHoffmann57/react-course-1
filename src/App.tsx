import React, {useState} from "react"
import {List} from './List';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"
import {Card} from "./Card";
import _ from 'lodash'
import './App.css'
import nextId from "react-id-generator";


const cards = [
    {
        id: nextId(),
        name: "Todo List React",
        //  description: "todo1",
    },
    {
        id: nextId(),
        name: "Project Flutter",
        //  description: "todo2",
    },
    {
        id: nextId(),
        name: "Play Symfony",
        //  description: "todo3",
    },
    {
        id: nextId(),
        name: "Magento ou tard",
        // description: "todo4",
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

const listItems = {
    "tasks": {
        id: '0',
        title: 'Todo',
        items: cards,
    },
    "progress": {
        id: '1',
        title: 'In progress',
        items: [],
    },
    "done": {
        id: '2',
        title: 'Done!',
        items: [],
    }
}


function App() {
    const [todo, setTodo] = useState(listItems)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [toggleSubmit, setToggleSubmit] =useState(true)
    const [isEditItem, setIsEditItem] =useState(null)



    const onDragEn = (result: DropResult) => {
        const {destination, source} = result
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
    const addItem = () => {
        if(!name) {
            alert('Enter a task');
        } else if (name && !toggleSubmit) {
            setTodo(prev => {
                return {
                    ...prev,
                    tasks: {
                        id: "0",
                        title: "Todo",
                        items: prev.tasks.items.map((elt) =>{
                            if( elt.id === isEditItem){
                                return { ...elt, name:name}
                            }
                            return elt;
                        })

                    }

                }

            })
            setToggleSubmit(true)
            setName('')
            //setDescription("")
            setIsEditItem(null)
        }else{
            setTodo(prev => {
                return {
                    ...prev,
                    tasks: {
                        id: "0",
                        title: "Todo",
                        items: [
                            {
                                id: nextId(),
                                name: name,
                                //description: description,
                            },
                            ...prev.tasks.items
                        ]
                    }
                }
            })
        }
    }

    const deleteTask = (id: any) => {
        setTodo(prev => {
            return {
                ...prev,
                tasks: {
                    id: "0",
                    title: "Todo",
                    items: prev.tasks.items.filter((elt:any) => elt.id !== id)
                }
            }
        })
    }

    const editItem = (id:any) => {
        let newEditItem  = todo.tasks.items.find((elt) =>{
            return elt.id === id
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setName(newEditItem.name)
        // setName(editItem.description)
        setIsEditItem(id)
    }


    return (
        <div className="App">
            <h1 className={"main-title"}>My to do List tasks!</h1>
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required={true}/><br/>

                {
                    toggleSubmit ?   <button onClick={addItem}>Add</button> :
                        <button onClick={addItem}>Update</button>
                }

            </div>
            <DragDropContext onDragEnd={onDragEn}>
                {_.map(todo, (data, key: any) => {
                    return (
                        <div key={key} className={"column"}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key.toString()}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map((elt: any, index: any) => {
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
                                                                <div className={"eachItem"} key={elt.id}>
                                                                    <h3>{elt.name}</h3>
                                                                </div>
                                                                <div className={"btn"}>
                                                                    <button onClick={() =>editItem(elt.id)}>Edit</button>
                                                                    <button onClick={() =>deleteTask(elt.id)}>Delete task</button>
                                                                </div>

                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}

                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}

export default App
