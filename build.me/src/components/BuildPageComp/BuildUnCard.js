import { ContextData } from '../../pages/Builds';
import { useContext, useState, useEffect } from 'react';

const BuildUnCard = () => {

    const { addCards, addBuildButtonLoad,setAddBuildButtonLoad, submitting } = useContext(ContextData);

    const AddingCards =  async () => {
        setAddBuildButtonLoad(true)
        await addCards()
        return
    }
    return (
        <div className="relative flex justify-center flex-shrink-0 w-6/12 h-full p-5 pb-20 duration-300 border-2 border-dashed shadow-lg bg-blueGray-200 border-trueGray-400 rounded-xl hover:bg-gray-100 hover:border-gray-100">
            <div className="flex flex-col items-center justify-center">
                {(() => {
                    if (addBuildButtonLoad) return (<>
                        <button className="flex flex-row items-start px-10 py-3 text-5xl font-light duration-300 scale-110 bg-indigo-500 rounded-full shadow-lg font-roboto motion-reduce:transform-none focus:outline-none"
                        title="Loading Add Build"
                        >
                            <svg className="w-12 h-12 mx-20 transition duration-300 delay-200 animate-spin" fill="none" stroke="#E5E7EB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        </button>
                    </>)
                    else return (<>
                        <button className="flex flex-row items-start px-10 py-3 text-5xl font-light duration-300 rounded-full font-roboto hover:bg-indigo-500 hover:shadow-lg hover:text-coolGray-100 hover:scale-110 motion-reduce:transform-none focus:outline-none" onClick={() => AddingCards()}
                        title="Add Build" disabled={submitting}
                        >
                            <p>Add Build</p>
                        </button>
                    </>)
                })()}
            </div>
        </div>
    )
}

export default BuildUnCard
