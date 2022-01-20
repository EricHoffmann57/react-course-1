import React from 'react';
import List from './List';

//Create Data
const card = [
    {
    id: 0,
    title: 'todo1',
    description: 'todo1',
    },
    {
        id: 1,
        title: 'todo2',
        description: 'todo2',
    },
    {
        id: 2,
        title: 'todo2',
        description: 'todo2',
    }
]

const list = [
    {
    id: 0,
    title: 'Todo',
    items: card,
   },
    {
        id: 1,
        title: 'In progress',
        items: card,
    },
    {
        id: 2,
        title: 'Done!',
        items: card,
    },
]
const data = list;


//Display Data (pas de props car parent)
const App = () => {

    return (
        <div>
            { data.map((currentElement) => <List key={currentElement.id} id={currentElement.id} title={currentElement.title} items={currentElement.items} />) }
        </div>
    );
}


//Manipulate Data


export default App;

