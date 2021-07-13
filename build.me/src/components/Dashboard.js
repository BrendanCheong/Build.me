import { useState } from 'react';
import LineChart from "./Charts/LineChart"
import Rating from "@material-ui/lab/Rating";
import moment from "moment";

const Dashboard = () => {

    const [toggleTabs, setToggleTabs] = useState(1);

    const Toggler = (index) => {
        setToggleTabs(index);
    };

    const testFunc = (seconds) => {
        const date = new Date(0);
        date.setUTCSeconds(seconds);
        const answer = moment(date).format('MMM Do YYYY');
        return answer;
    }

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
                        <h1 className="p-3 mt-4 text-xl text-white font-roboto"> Best Sellers for July</h1>
                        <span className="lg:ml-96"></span>
                        <span className="lg:ml-56"></span>
                        <div className="flex pt-4">
                            <button 
                            className={ toggleTabs === 1 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(1)}>
                                CPU
                            </button>
                            <button 
                            className={ toggleTabs === 2 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(2)}>
                                Motherboard
                            </button>
                            <button 
                            className={ toggleTabs === 3 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(3)}>
                                GPU
                            </button>
                            <button 
                            className={ toggleTabs === 4 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(4)}>
                                Memory
                            </button>
                            <button 
                            className={ toggleTabs === 5 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
                                :
                                "px-4 py-2 font-semibold text-white rounded-t mt-2"
                                }
                            onClick={() => Toggler(5)}>
                                PSU
                            </button>
                            <button 
                            className={ toggleTabs === 6 ?
                                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-white border-t border-l border-r rounded-t focus:outline-none mt-2"
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
                    className={ toggleTabs === 1 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }
                    >
                    
                        {/** Card Start */}
                            <div className="max-w-sm mx-auto my-8 overflow-hidden rounded shadow-lg">
                                <div className="relative w-full h-56">
                                    <img className="absolute object-cover w-full h-full rounded-lg" src={(() => {

                                        const imgLink = "https://images-na.ssl-images-amazon.com/images/I/71mINzpZ7QL._AC_UL200_SR200,200_.jpg"
                                        return imgLink.replace("_AC_UL200_SR200,200_", "_AC_SX466_")
                                        })()}
                                        alt="Product Power"/>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="mb-2 text-xl font-bold">Intel Core i5-9600K Desktop Processor 6 Cores up to 4.6 GHz Turbo unlocked LGA1151 300 Series 95W</div>
                                    <p className="text-lg text-gray-600 font-roboto">
                                    Current Price: S$ 295.00
                                    </p>
                                    <div className="flex flex-row">
                                        <Rating name="product rating" 
                                        defaultValue={2} 
                                        precision={0.5}
                                        max={5}
                                        readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        {/** Card End */}
                        <div className="w-8/12 p-5 bg-white shadow-md h-custom rounded-xl">
                            <LineChart/>
                        </div>
                    </div>
                    <div id="second" className={ toggleTabs === 2 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                    Second tab
                    </div>
                    <div id="third" className={ toggleTabs === 3 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                    Third tab
                    </div>
                    <div id="fourth" className={ toggleTabs === 4 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                    Fourth tab
                    </div>
                    <div id="fifth" className={ toggleTabs === 5 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                    Fifth tab
                    </div>
                    <div id="sixth" className={ toggleTabs === 6 ? "p-4 h-full bg-white w-full shadow-md rounded-b-2xl justify-center items-center flex flex-row"
                    :
                    "hidden p-4"
                    }>
                    Sixth tab
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
