import { ContextData } from '../../pages/Builds';
import { useContext } from 'react';

const BuildUnCard = () => {

    /*
    id: int
    addCards: func
    changling done
    */

    const {addCards} = useContext(ContextData);

    return (
        <div className="relative flex justify-center flex-shrink-0 w-6/12 h-full p-5 pb-20 border-2 border-dashed shadow-lg bg-blueGray-200 border-trueGray-400 rounded-xl">
            <div className="flex flex-col items-center justify-center">
                <button className="px-10 py-3 text-5xl font-light duration-300 rounded-full font-roboto hover:bg-indigo-500 hover:shadow-lg hover:text-coolGray-100 hover:scale-110 motion-reduce:transform-none" onClick={() => addCards()}
                title="Add Build"
                >
                Add Build
                </button>
            </div>
        </div>
    )
}

export default BuildUnCard
