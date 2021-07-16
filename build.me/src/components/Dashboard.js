import { useState } from 'react';
import DashboardTab from './FrontPage/DashboardTab';

const Dashboard = () => {

    const [toggleTabs, setToggleTabs] = useState(1);

    const Toggler = (index) => {
        setToggleTabs(index);
    };
    const dateObj = new Date()
    const monthName = dateObj.toLocaleString("default", { month: "long" })

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 lg:p-10">
            <h1 className="text-black lg:text-5xl md:text-3xl sm:text-2xl font-poppins lg:mt-56">
                Welcome to Build.me!
            </h1>

            {/* <div className="w-6/12 h-4/6 ml-96 pl-52">
                <LineChart/>
            </div> */}
            <div className="lg:pt-10">
                <div id="tabs buttons" className="inline-flex flex-row w-full mx-auto bg-indigo-500 border-b lg:mr-10 rounded-t-md">
                    <div className="flex overflow-hidden top">
                        <h1 className="p-3 mt-4 text-xl text-white font-roboto">{`Best Sellers for ${monthName}`}</h1>
                        <span className="lg:ml-96"></span>
                        <span className="lg:ml-56"></span>
                        <div className="flex pt-4">
                            <button 
                            className={ toggleTabs === 1 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(1)}>
                                CPU
                            </button>
                            <button 
                            className={ toggleTabs === 2 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(2)}>
                                Motherboard
                            </button>
                            <button 
                            className={ toggleTabs === 3 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(3)}>
                                GPU
                            </button>
                            <button 
                            className={ toggleTabs === 4 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(4)}>
                                Memory
                            </button>
                            <button 
                            className={ toggleTabs === 5 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(5)}>
                                PSU
                            </button>
                            <button 
                            className={ toggleTabs === 6 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-indigo-100 border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(6)}>
                                Storage
                            </button>
                        </div>
                    </div>
                    
                </div>

                <div id="tab-contents" className="w-full h-screen">
                    <div id="first" 
                    className={ toggleTabs === 1 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }
                    >
                    
                        <DashboardTab name={"CPU"}/>
                    </div>
                    <div id="second" className={ toggleTabs === 2 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                        <DashboardTab name={"Motherboard"}/>

                    </div>
                    <div id="third" className={ toggleTabs === 3 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                        <DashboardTab name={"GPU"}/>
                    </div>
                    <div id="fourth" className={ toggleTabs === 4 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                        <DashboardTab name={"Memory"}/>
                    </div>
                    <div id="fifth" className={ toggleTabs === 5 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                        <DashboardTab name={"PSU"}/>
                    </div>
                    <div id="sixth" className={ toggleTabs === 6 ? "p-4 h-full bg-indigo-100 w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                        <DashboardTab name={"Storage"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
