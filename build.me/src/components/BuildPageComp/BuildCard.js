import BuildUnpart from "./BuildUnpart";
import BuildPart from './BuildPart';
import LoadingSVG from '../../images/svg/LoadingSVG';
import { ContextData } from '../../pages/Builds';
import { useContext, useState } from 'react';


const BuildCard = () => {

    /**
    id : int
    handleDelete: func
    partsData: list -> obj -> with parts data => given to Parts
    changeNewParts: func -> replaces unpart with part => given to unParts
    */
    const [isLoading, setIsLoading] = useState(false);
    const {handleDelete,card} = useContext(ContextData)

    return (
            <div className="relative flex flex-shrink-0 w-6/12 h-full p-5 pb-20 bg-white border-2 shadow-lg rounded-xl">
                <form className="absolute top-0 left-0 flex flex-row w-11/12 mt-2 bg-white shadow-md ml-7 rounded-xl"
                >
                    <input className="w-9/12 px-3 py-2 text-md"
                    name="Build Name"
                    placeholder="Enter Build Name"
                    type="text"
                    />
                    <div className="">
                        <LoadingSVG/>
                    </div>
                    {/* <div>
                        <div className="w-12 h-10 bg-transparent"></div>
                    </div> */}
                    <button className="px-5 py-1 mb-2 ml-2 rounded-full shadow-md bg-trueGray-200 font-roboto"
                    type="submit">
                        Submit
                    </button>
                </form>
                <div className="grid w-full h-full grid-flow-row grid-cols-3 grid-rows-2 mt-10 ml-2">
                    {/** Map the parts and unparts here */}
                    {card.partsData.map((part) => (
                        part.isUnPart ?

                        <BuildUnpart name={part.name} id={card._id} key={part.name + card._id} card={card}/>

                        :

                        <BuildPart name={part.name} id={card._id} key={part.name + card._id} card={card}/>
                    ))}
                </div>
                <h1 className="absolute bottom-0 left-0 py-1 pl-4 mb-2 bg-white rounded-lg shadow-md w-52 ml-7 text-md font-roboto">
                {`Total Price: ${card._id.slice(0,5)}`}
                </h1>
                <button className="absolute px-4 py-1 text-white duration-300 bg-indigo-500 rounded-lg shadow-md bottom-2 right-6 hover:bg-indigo-700"
                onClick={() => handleDelete(card._id)}>
                    Remove Build
                </button>
            </div>
    )
}

export default BuildCard
