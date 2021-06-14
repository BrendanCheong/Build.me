import { Link } from 'react-router-dom';

const UnParts = ({name, id, card}) => {
    /*
    name: string -> taken from Cards -> Ex: name = CPU, Motherboard, GPU etc
    id: int -> taken from Cards
    card: infomation of the current card its on, like: id, partsData, name etc
    */


    const newTo = {
        pathname: `/${name}_Table`,
        data: {id : id, card: card}
    }

    return (
        <div className="flex flex-col justify-between p-2 border-2 border-gray-400 border-dashed rounded-md shadow-inner">
            {name}
            <div className="flex justify-end">
                <Link className="font-poppins" to={newTo}>
                    Add
                </Link>
            </div>
        </div>
    )
}

export default UnParts
