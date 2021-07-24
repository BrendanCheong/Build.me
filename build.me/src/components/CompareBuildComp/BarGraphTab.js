import { useContext, useState, useEffect } from 'react';
import { CompBuildPageData } from '../../pages/Compare_Builds';
import PriceBarChart from '../Charts/PriceBarChart';
import axiosInstance from '../../AxiosInstance';
import axios from 'axios';
import FPSBarChart from '../Charts/FPSBarChart';

const BarGraphTab = () => {

    const { toggleBarGraph, setToggleBarGraph, autoCompleteState0, autoCompleteState1 } = useContext(CompBuildPageData);
    const [CPUleftBar, setCPUleftBar] = useState([0, 0, 0, 0, 0, 0]);
    const [CPUrightBar, setCPUrightBar] = useState([0, 0, 0, 0, 0, 0]);
    const [CPUlabel, setCPUlabel] = useState(null)
    const [GPUleftBar, setGPUleftBar] = useState([0, 0, 0, 0, 0, 0]);
    const [GPUrightBar, setGPUrightBar] = useState([0, 0, 0, 0, 0, 0]);
    const [GPUlabel, setGPUlabel] = useState(null)
    const [CPUnameLeft, setCPUnameLeft] = useState("");
    const [GPUnameLeft, setGPUnameLeft] = useState("");
    const [CPUnameRight, setCPUnameRight] = useState("");
    const [GPUnameRight, setGPUnameRight] = useState("");

    const dataFetcher = async (state, func, label, type, side) => {
        const response = await axiosInstance.get('/Builder/find')
        const selectedCardZero = response.data.CardArray.filter((card) => card.CardName === state)[0]
        const CPUstring = selectedCardZero.partsData[0].itemName
        const GPUstring = selectedCardZero.partsData[2].itemName
        if (side === 'left') {
            setCPUnameLeft(CPUstring);
            setGPUnameLeft(GPUstring);
        } else if (side === "right") {
            setCPUnameRight(CPUstring);
            setGPUnameRight(GPUstring);
        }
        
        const Brand = CPUstring.includes("AMD") ? "AMD" : "Intel"

        if (type === "CPU") {
            const answer = await axiosInstance.post("/UBM/CPU", {
                "Brand": Brand,
                "Model": CPUstring.substr(CPUstring.indexOf(" ") + 1)
            })
            console.log(answer.data)
            const response = answer.data
            if (Object.keys(response).length) {
                
                label(Object.keys(answer.data))
                func(Object.values(answer.data));
            }
            
        } else {
            const answer = await axiosInstance.post("/UBM/GPU", {
                "Model": GPUstring.substr(GPUstring.indexOf(" ") + 1)
            })
            console.log(answer.data)
            const response = answer.data
            if (Object.keys(response).length) {
                
                label(Object.keys(answer.data))
                func(Object.values(answer.data));
            }
        }
    }

    useEffect(() => {
        
        if (autoCompleteState0) {
            dataFetcher(autoCompleteState0, setCPUleftBar, setCPUlabel, "CPU", "left");
            dataFetcher(autoCompleteState0, setGPUleftBar, setGPUlabel, "GPU", "left");
        } 

        if (autoCompleteState1) {
            dataFetcher(autoCompleteState1, setCPUrightBar, setCPUlabel, "CPU", "right");
            dataFetcher(autoCompleteState1, setGPUrightBar, setGPUlabel, "GPU", "right");
        }

    }, [autoCompleteState0, autoCompleteState1])

    const Toggler = (index) => {
        setToggleBarGraph(index);
    };

    return (
        <div className="w-full h-full border rounded-md shadow-md">
            <div id="tabs buttons" className="inline-flex w-full px-1 pt-2 bg-teal-500 border-b rounded-t-md">
                <button 
                className={ toggleBarGraph === 1 ? 
                "px-4 py-2 -mb-px font-semibold text-gray-800 border-t border-l border-r rounded-t bg-trueGray-100 focus:outline-none"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
                onClick={() => Toggler(1)}
                >
                    Price Comparison
                </button>
                <button 
                className={ toggleBarGraph === 2 ? 
                "px-4 py-2 -mb-px font-semibold text-gray-800 border-t border-l border-r rounded-t bg-trueGray-100 focus:outline-none"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
                onClick={() => Toggler(2)}
                >
                    CPU FPS Comparison
                </button>
                <button 
                className={ toggleBarGraph === 3 ? 
                "px-4 py-2 -mb-px font-semibold text-gray-800 border-t border-l border-r rounded-t bg-trueGray-100 focus:outline-none"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
                onClick={() => Toggler(3)}
                >
                    GPU FPS Comparison
                </button>
            </div>
            <div id="tab-contents" className="w-full h-5/6">
                <div id="first" 
                className={toggleBarGraph === 1 ?
                    "flex flex-col items-center pt-5 w-full h-full "
                    :
                    "hidden p-4"}
                >
                    <PriceBarChart/>
                </div>
                <div id="second" 
                className={toggleBarGraph === 2 ?
                    "flex flex-col items-center pt-5 w-full h-full"
                    :
                    "hidden p-4"}
                >
                    <FPSBarChart labels={CPUlabel} BarGraphLeft={CPUleftBar} BarGraphRight={CPUrightBar} nameLeft={CPUnameLeft} nameRight={CPUnameRight}/>
                </div>
                <div id="third" 
                className={toggleBarGraph === 3 ?
                    "flex flex-col items-center pt-5 w-full h-full"
                    :
                    "hidden p-4"}
                >
                    <FPSBarChart labels={GPUlabel} BarGraphLeft={GPUleftBar} BarGraphRight={GPUrightBar} nameLeft={GPUnameLeft} nameRight={GPUnameRight}/>
                </div>
            </div>
        </div>
    )
}

export default BarGraphTab
