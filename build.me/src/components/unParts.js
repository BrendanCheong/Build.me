import { Link } from 'react-router-dom';


const UnParts = ({name, id, card}) => {
    /*
    name: string -> taken from Cards
    id: int -> taken from Cards
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */

    const newTo = {
        pathname: `/${name}_Table`,
        state: {id : id, card: card, penis:"penis"}
    }

    return (
        <div className="flex flex-col justify-between p-2 border-2 border-gray-400 border-dashed rounded-md shadow-inner">
            {name}
            <div className="flex justify-end">
                <Link className="font-poppins" to={newTo}>
                    Add
                </Link>
            </div>
            <button onClick={()=>console.log(card)}>test</button>
        </div>
    )
}

export default UnParts
