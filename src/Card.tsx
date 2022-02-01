
//définition de l'interface en TS

export interface Card{
    id :string,
    title :string,
    description: string,
}
/*
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
*/
