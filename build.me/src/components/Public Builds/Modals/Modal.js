import { useContext } from "react";
import { TableDataContext } from "../Tables/Tables";
import LoadingCard from "./LoadingCard";
import ModalCard from "./ModalCard";

const Modal = () => {

    const {
        openModal, modalClose,
        infoState, setInfoState, 
        Name, Evaluate,
        isAmazonModalLoading, setIsAmazonModalLoading,
        rowOriginal, setRowOriginal,
    } = useContext(TableDataContext);

    return (
        <div>
            <dialog id={`${Name} Modal`} className="relative z-0 w-screen h-screen bg-transparent">
                <span className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full transition-opacity duration-300 bg-gray-900 bg-opacity-50 opacity-0 p-7">
                    <div className="relative flex flex-col w-11/12 h-full bg-white rounded-lg shadow-md lg:w-11/12">
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
                        <div className="w-full h-full space-y-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
                            {/** Skeleton Section */}
                            <section className="flex flex-col w-screen p-5 bg-white space-y-7 h-4/6" id="Skeleton Loading">
                                <div className="w-48 h-16 text-xl bg-gray-200 rounded-sm animate-pulse font-roboto">
                                    <h2 className="ml-5 text-transparent">Loading...</h2>
                                </div>
                                <div className="flex flex-row items-center space-x-5">
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                </div>
                            </section>
                            {/** Loaded Section */}
                            <section className="flex flex-col w-full h-full p-5 bg-white space-y-7" id="Loaded Card">
                                <span className="h-16 text-3xl text-center rounded-sm w-44">
                                    <h2 className="py-2 ml-5 font-bold text-indigo-800 bg-indigo-200 font-poppins rounded-xl">Qo10</h2>
                                </span>
                                <div className="flex flex-row space-x-5">
                                    {/** Recommended Section */}
                                    <div className="-space-y-5" id="Recommended block">
                                        <div className="w-56 h-16 text-xl rounded-sm">
                                            <h3 className="ml-5 font-bold text-black font-poppins">Recommended</h3>
                                        </div>
                                        <section className="flex flex-row items-center space-x-5">
                                            <ModalCard/>
                                            <ModalCard/>
                                            <ModalCard/>
                                        </section>
                                    </div>
                                    {/** Suggestions Section */}
                                    <div className="-space-y-5" id="Suggestions block">
                                        <div className="h-16 text-lg rounded-sm w-96">
                                            <h3 className="ml-5 font-bold text-black font-poppins">Can't find what you're looking for? Here's some Suggestions</h3>
                                        </div>
                                        <section className="flex flex-row items-center space-x-5">
                                            <ModalCard/>
                                            <ModalCard/>
                                        </section>
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-col w-screen p-5 bg-white space-y-7 h-4/6" id="Skeleton Loading">
                                <div className="w-48 h-16 text-xl bg-gray-200 rounded-sm animate-pulse font-roboto">
                                    <h2 className="ml-5 text-transparent">Loading...</h2>
                                </div>
                                <div className="flex flex-row items-center space-x-5">
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                    <LoadingCard/>
                                </div>
                            </section>
                        </div>
                        {/* <-!----Modal Section End----> */}
                    </div>
                </span>
            </dialog>
        </div>
    )
}

export default Modal
