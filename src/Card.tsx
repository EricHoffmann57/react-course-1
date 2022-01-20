import React from 'react';
//définition de l'interface en TS

interface Card{
    id :number,
    title :string,
    description: string,
}

//component
export const Card = (props :Card) => {
    //destructuration de props
    const {id, title, description} = props;

    return (
        <li className="card">
            <label>id:{id}</label><br />
            <label>title:{title}</label> <br />
            <p>description:{description}</p>
        </li>
    )
}
//export
export default Card;
