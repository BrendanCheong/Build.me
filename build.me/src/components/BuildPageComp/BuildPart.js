import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextData } from '../../pages/Builds';

const BuildPart = ({name, id, card}) => {

    
    /*
    name: string -> taken from Cards -> Ex: name = CPU, Motherboard, GPU etc
    id: int -> taken from Cards
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */

    const {changeNewParts} = useContext(ContextData)

    const newTo = {
        pathname: `/${name}_Table`,
        data: {id : id, card: card,}
    }

    var index
    switch(name) {
        case "CPU":
            index = 0
            break;
        case "Motherboard":
            index = 1
            break;
        case "GPU":
            index = 2
            break;
        case "Memory":
            index = 3
            break;
        case "PSU":
            index = 4
            break;
        default:
            index = 5
            break;
    }

    return (
        <div className="relative flex flex-col bg-white rounded shadow-md h-60 w-52">
            <div className="relative h-32 bg-gray-200 rounded-tl-md rounded-tr-md">
                <img alt="product artistry" src={card.partsData[index].itemImg} 
                className="absolute object-cover object-center w-full h-full rounded-tl-md rounded-tr-md"/>
            </div>
            <div className="flex flex-col items-start justify-between p-2 space-y-1 font-roboto">
                <h1 className="text-sm">{card.partsData[index].itemName}</h1>
                <h1 className="text-sm">{`Vendor: ${card.partsData[index].vendorName}`}</h1>
                <h1 className="px-3 py-1 text-xs text-left bg-white rounded-lg shadow-md">{card.partsData[index].itemPrice}</h1>
            </div>
            <div className='absolute bottom-0 flex flex-row w-full pb-2 ml-2 space-x-9'>
                    <Link className='px-3 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100 hover:shadow-md'
                    to={newTo}>
                        CHANGE
                    </Link>
                    <button className='px-3 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100 hover:shadow-md'
                    onClick={() => changeNewParts(name, id, true)}>
                        REMOVE
                    </button>
            </div>
        </div>
    )
}

export default BuildPart
