import { useContext } from 'react';
import { CompBuildPageData } from '../../pages/Compare_Builds';
import PriceBarChart from '../Charts/PriceBarChart';

const BarGraphTab = () => {

    const { toggleBarGraph, setToggleBarGraph, BarGraphData } = useContext(CompBuildPageData);

    const Toggler = (index) => {
        setToggleBarGraph(index);
    };

    return (
        <div className="w-full h-full border rounded-md shadow-md">
            <div id="tabs buttons" className="inline-flex w-full px-1 pt-2 bg-teal-500 border-b rounded-t-md">
                <button 
                className={ toggleBarGraph === 1 ? 
                "px-4 py-2 -mb-px font-semibold text-gray-800 border-t border-l border-r rounded-t bg-trueGray-100"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
                onClick={() => Toggler(1)}
                >
                    Price Comparison
                </button>
                <button 
                className={ toggleBarGraph === 2 ? 
                "px-4 py-2 -mb-px font-semibold text-gray-800 border-t border-l border-r rounded-t bg-trueGray-100"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
                onClick={() => Toggler(2)}
                >
                    FPS Comparison
                </button>
            </div>
            <div id="tab-contents" className="w-full h-5/6">
                <div id="first" 
                className={toggleBarGraph === 1 ?
                    "flex flex-col items-center pt-5 w-full h-full "
                    :
                    "hidden p-4"}
                >
                    <PriceBarChart BarGraphData={BarGraphData}/>
                </div>
                <div id="second" 
                className={toggleBarGraph === 2 ?
                    "block p-4"
                    :
                    "hidden p-4"}
                >
                    Second tab
                </div>
            </div>
        </div>
    )
}

export default BarGraphTab
