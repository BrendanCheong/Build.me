import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextData } from '../../pages/Builds';

const BuildPart = ({name, id, card}) => {

    
    /*
    name: string -> taken from Cards -> Ex: name = CPU, Motherboard, GPU etc
    id: int -> taken from Cards
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */

    const {changeNewParts, changingPartsLoad, setChangingPartsLoad, selectedCardID, setSelectedCardID, selectedPartType, setSelectedPartType, submitting, } = useContext(ContextData)

    

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
    let NewItemName = card.partsData[index].itemName
    if(NewItemName.length > 44) {
        NewItemName = `${card.partsData[index].itemName.slice(0,44)}..`
    }

    const changingParts = () => {
        setChangingPartsLoad(true)
        setSelectedPartType(name)
        setSelectedCardID(id)
        changeNewParts(name, id, true)
    }

    return (
        <div className="relative flex flex-col h-64 bg-white rounded shadow-md w-52">
            <div className="relative h-32 bg-gray-200 rounded-tl-md rounded-tr-md">
                <img alt="product artistry" src={card.partsData[index].itemImg} 
                className="absolute object-cover object-center w-full h-full rounded-tl-md rounded-tr-md"/>
            </div>
            <div className="flex flex-col items-start justify-between p-2 space-y-1 font-roboto">
                <h1 className="text-sm">{NewItemName}</h1>
                <h1 className="text-sm">{`Vendor: ${card.partsData[index].vendorName}`}</h1>
                <h1 className="px-3 py-1 text-xs text-left bg-white rounded-lg shadow-md">{"S$ " + card.partsData[index].itemPrice.replace("S$","")}</h1>
            </div>
            <div className='absolute bottom-0 flex flex-row w-full pb-2 ml-2 space-x-9'>
                    <Link className='px-3 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100 hover:shadow-md'
                    to={newTo}>
                        CHANGE
                    </Link>
                    {
                        (changingPartsLoad && selectedCardID === id && selectedPartType === name) ?
                        <button className='px-5 text-sm font-medium text-indigo-600 duration-300 bg-transparent bg-indigo-100 rounded-full focus:outline-none hover:shadow-md'
                        >
                            <svg className="w-5 h-5 transition duration-300 delay-200 animate-spin" fill="none" stroke="#6366F1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        </button>
                        :
                        <button className='px-3 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100 hover:shadow-md'
                        onClick={() => changingParts()}
                        disabled={submitting}>
                            REMOVE
                        </button>
                    }
            </div>
        </div>
    )
}

export default BuildPart
