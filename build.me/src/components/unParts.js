import { ContextData } from "../pages/Builds";
import { useContext } from 'react';



const UnParts = ({name, id,}) => {
    /*
    name: string -> taken from Cards
    id: int -> taken from Cards
    addNewParts: func -> taken from Cards => changes unParts to Parts
    */
    const {changeNewParts} = useContext(ContextData)

    return (
        <div className="flex flex-col justify-between p-2 border-2 border-gray-400 border-dashed rounded-md shadow-inner">
            {name}
            <div className="flex justify-end">
                <button onClick={() => changeNewParts(name, id, false)} className="font-poppins">
                    Add
                </button>
            </div>
        </div>
    )
}

export default UnParts
