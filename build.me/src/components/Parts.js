import { ContextData } from "../pages/Builds";
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Parts = ({name, id, card}) => {

    /*
    name: string -> taken from Cards -> Ex: name = CPU, Motherboard, GPU etc
    id: int -> taken from Cards
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */

    const newTo = {
        pathname: `/${name}_Table`,
        data: {id : id, card: card}
    }

    const {changeNewParts} = useContext(ContextData)

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
            index = 0
            break;
    }

    return (
        <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-2 bg-gray-100 rounded-md">
                <img className="w-32 h-20 row-span-3 pt-1 pl-1" src={card.partsData[index].itemImg} alt="Product"></img>
                <div className="col-span-2">{card.partsData[index].itemName}</div>
                <div className="">{`Vendor: ${card.partsData[index].vendorName}`}</div>
                <div className="font-poppins">{card.partsData[index].itemPrice}</div>
                <div className="static flex justify-around">
                    <div></div>
                    <div></div>
                    <Link className="static px-2 py-1 text-sm text-white duration-300 transform bg-indigo-400 rounded-full hover:scale-110 motion-reduce:transform-none" to={newTo}>
                        Change
                    </Link>
                </div>
                <div className="static flex justify-around">
                    <div></div>
                    <div></div>
                    <button className="static px-2 py-1 text-sm text-white duration-300 transform bg-indigo-400 rounded-full hover:scale-110 motion-reduce:transform-none"
                    onClick={() => changeNewParts(name, id, true)}>
                        Remove
                    </button>
                </div>
        </div>
    )
}

export default Parts
