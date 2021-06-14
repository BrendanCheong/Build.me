import React from 'react'
import ModalCard from './ModalCard';
import { TableDataContext } from './Table';
import { useContext } from 'react';
import SkeletonBox from "./SkeletonBox";

const Modal = ({ onClose, id, card}) => {

    const {isOpenModal, infoState, setInfoState, Name, isModalLoading, setIsModalLoading, rowOriginal,} = useContext(TableDataContext);

    if(!isOpenModal) return null // if not open, render nothing, else render below box

    function Close_Null() {
        setInfoState(null)
        setIsModalLoading(true)
        return onClose()
    }

    
    return (
        <>
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            {/* <div className=""> */}
                {/* <animated.div style={animation}> */}
                    <div className="z-40 flex flex-col overflow-auto bg-white rounded shadow-md lg:w-11/12 lg:h-5/6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
                    {/** <!-- Header Start --> */}
                        <div className="flex items-center justify-center w-full h-auto space-x-36">
                                <div className="flex items-center justify-center w-10/12 h-auto py-3 text-2xl font-bold pl-80 font-poppins">
                                    {"Choose A Seller!"}
                                    <p className="text-xs text-transparent">{id}</p>
                                </div>

                                <div onClick={() => Close_Null()} className="flex justify-center object-right-top h-auto p-2 duration-300 rounded-full cursor-pointer hover:bg-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </div>
                    {/* <!--Header End--> */}
                        </div>
                    {/* <!-- Modal Content--> */}
                        <div className="flex flex-col space-y-12">
                            { isModalLoading ? 
                            
                            <>
                            <div className="w-48 h-10 bg-gray-200 rounded-sm ml-14 animate-pulse"></div>
                                <div className="flex flex-wrap items-start justify-center px-8 mb-24 space-x-4 overflow-x-auto overflow-y-scroll text-center bg-white rounded scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
                                
                                    <SkeletonBox/>
                                    <SkeletonBox/>
                                    <SkeletonBox/>
                                    <SkeletonBox/>
                                    <SkeletonBox/>
                                </div>
                            </>  
                            
                            
                            :
                            /** ModalCard Block start */
                            <div>
                            
                                <h1 className="py-6 pl-10 font-semibold lg:text-2xl">Amazon</h1>
                                <div className="flex items-start px-8 pb-8 space-x-4 overflow-x-auto overflow-y-scroll text-center bg-white rounded scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
                                        { infoState.map((product) => (
                                            <ModalCard id={id} card={card} name={Name} info={product} rowOriginal={rowOriginal}/>
                                        ))}  
                                </div>
                            </div>
                            /** ModalCard Block end*/ }
                            
                    {/* <!-- End of Modal Content--> */}
                        </div>
                    </div>
                {/* </animated.div> */}
            {/* </div> */}
        </div>
        </>
    )
}

export default Modal
