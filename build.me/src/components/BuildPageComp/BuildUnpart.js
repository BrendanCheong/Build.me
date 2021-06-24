import CPUsvg from '../../images/svg/CPUsvg';
import GraphicCardsvg from '../../images/svg/GraphicCardsvg';
import Motherboardsvg from '../../images/svg/Motherboardsvg';
import PSUsvg from '../../images/svg/PSUsvg';
import RAMsvg from '../../images/svg/RAMsvg';
import Storagesvg from '../../images/svg/Storagesvg';
import { Link } from 'react-router-dom';


const BuildUnpart = ({name, id, card}) => {

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
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dotted rounded shadow-md border-coolGray-300 bg-trueGray-100 w-52">
            {(()=> {
                switch(name) {
                    case "CPU":
                        return (<CPUsvg key={id + name}/>)
                    case "Motherboard":
                        return (<Motherboardsvg key={id + name}/>)
                    case "GPU":
                        return (<GraphicCardsvg key={id + name}/>)
                    case "Memory":
                        return (<RAMsvg key={id + name}/>)
                    case "PSU":
                        return (<PSUsvg key={id + name}/>)
                    default:
                        return (<Storagesvg key={id + name}/>)
                }
            })()}
            <div className=" font-poppins">{name}</div>
            <Link className="px-5 py-1 mt-3 duration-300 bg-white shadow-md rounded-xl hover:bg-indigo-500 hover:text-white font-roboto"
            to={newTo}>
                Add
            </Link>
        </div>
    )
}

export default BuildUnpart
