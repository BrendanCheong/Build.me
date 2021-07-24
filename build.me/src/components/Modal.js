import React from 'react'
import { TableDataContext } from './Table';
import { useContext } from 'react';
import Skeleton from './Public Builds/Modals/Skeleton';
import LoadedSection from './BuildPageComp/LoadedSection';

const Modal = ({ id, card }) => {

    const {
        isOpenModal, modalClose,
        infoState, setInfoState,
        ShopeeInfo, setShopeeInfo,
        Qo10Info, setQo10Info,
        Name, Evaluate,
        isAmazonModalLoading, setIsAmazonModalLoading,
        isShopeeModalLoading, setIsShopeeModalLoading,
        isQo10ModalLoading, setIsQo10ModalLoading,
        rowOriginal,

    } = useContext(TableDataContext);
    
    return (
        <>
            <div>
            <dialog id={`${Name} Modal`} className="relative z-0 w-screen h-screen bg-transparent">
                <span className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 bg-gray-900 bg-opacity-50 opacity-0 p-7">
                
                    <div className="relative flex flex-col w-11/12 h-full bg-white rounded-lg shadow-md lg:w-11/12">
                        {/* <button onClick={() => console.log(rowOriginal)}>Test</button> */}
                        {/* <!--Header Start--> */}
                        <div className="flex flex-row items-center justify-center w-full">
                        {/* Header Text */}
                            <div className="flex flex-row items-center w-full h-32 pt-5 justify-evenly">
                                    <h1 className="flex items-center justify-start h-full py-3 text-2xl font-bold text-center w-96 font-poppins">
                                        {`Choose A Seller For: ${Evaluate(rowOriginal)}`}
                                    </h1>
                        {/* Close Button SVG */}
                            </div>
                            <button onClick={() => modalClose(`${Name} Modal`)} className="relative flex h-auto p-2 duration-300 rounded-full hover:bg-red-500 focus:outline-none right-5 bottom-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        {/* <!--Header End--> */}
                        </div>
                        {/* <-!----Modal Section Start----> */}
                        <div className="w-full h-full space-y-56 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
                            {   !isAmazonModalLoading ? 
                                <LoadedSection rowOriginal={rowOriginal} infoState={infoState} Name={Name} scrapType={"Amazon"} id={id} card={card}/>
                                :
                                <Skeleton/>
                            }
                            {   !isShopeeModalLoading ? 
                                <LoadedSection rowOriginal={rowOriginal} infoState={ShopeeInfo} Name={Name} scrapType={"Shopee"} id={id} card={card}/>
                                :
                                <Skeleton/>
                            }
                            {   !isQo10ModalLoading ? 
                                <LoadedSection rowOriginal={rowOriginal} infoState={Qo10Info} Name={Name} scrapType={"Qo10"} id={id} card={card}/>
                                :
                                <Skeleton/>
                            }
                        </div>
                        {/* <-!----Modal Section End----> */}
                    </div>
                </span>
            </dialog>
        </div>
        </>
    )
}

export default Modal
