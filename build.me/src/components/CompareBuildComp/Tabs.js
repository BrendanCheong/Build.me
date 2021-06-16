import { useState } from 'react';

const Tabs = () => {

    const [toggleTabs, setToggleTabs] = useState(1);

    const Toggler = (index) => {
        setToggleTabs(index);
    };

    return (
        <div className="w-1/2 border rounded-md shadow-md">
        <div id="tabs buttons" className="inline-flex w-full px-1 pt-2 bg-indigo-500 border-b rounded-t-md">
            <button 
            className={ toggleTabs === 1 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(1)}>
                CPU
            </button>
            <button 
            className={ toggleTabs === 2 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(2)}>
                Motherboard
            </button>
            <button 
            className={ toggleTabs === 3 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(3)}>
                GPU
            </button>
            <button 
            className={ toggleTabs === 4 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(4)}>
                Memory
            </button>
            <button 
            className={ toggleTabs === 5 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(5)}>
                PSU
            </button>
            <button 
            className={ toggleTabs === 6 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(6)}>
                Storage
            </button>
            <button 
            className={ toggleTabs === 7 ?
                "px-4 py-2 -mb-px font-semibold text-gray-800 bg-trueGray-100 border-t border-l border-r rounded-t"
                :
                "px-4 py-2 font-semibold text-white rounded-t"
                }
            onClick={() => Toggler(7)}>
                Budget
            </button>
        </div>

        <div id="tab-contents">
            <div id="first" 
            className={ toggleTabs === 1 ? "block p-4"
            :
            "hidden p-4"
            }
            >
                First tab
            </div>
            <div id="second" className={ toggleTabs === 2 ? "block p-4"
            :
            "hidden p-4"
            }>
            Second tab
            </div>
            <div id="third" className={ toggleTabs === 3 ? "block p-4"
            :
            "hidden p-4"
            }>
            Third tab
            </div>
            <div id="fourth" className={ toggleTabs === 4 ? "block p-4"
            :
            "hidden p-4"
            }>
            Fourth tab
            </div>
            <div id="fifth" className={ toggleTabs === 5 ? "block p-4"
            :
            "hidden p-4"
            }>
            Fifth tab
            </div>
            <div id="sixth" className={ toggleTabs === 6 ? "block p-4"
            :
            "hidden p-4"
            }>
            Sixth tab
            </div>
            <div id="sixth" className={ toggleTabs === 7 ? "block p-4"
            :
            "hidden p-4"
            }>
            Budget Donut Graph, Enter Budget here!
            </div>
        </div>
        </div>
    )
}

export default Tabs
