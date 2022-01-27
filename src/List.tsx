import React from 'react';
import Card from "./Card";

//définition de l'interface en TS
export interface List{
    id :number,
    title :string,
    items :Card[],
}
/*
//component
const List = (props :List) => {

    //destructuration de props
    const {id, title, items} = props;
    console.log(id, title);


    return (
        <div className="list"><h5>{ title }</h5>
            <ul>
                { items.map((card)=><Card key={card.id} id={card.id} title={card.title} description={card.description}/>)}
            </ul>
        </div>
    )
}

//export
export default List;
*/
