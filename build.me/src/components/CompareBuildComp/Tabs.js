import { useState, useContext, useEffect } from 'react';
import { CompBuildPageData } from '../../pages/Compare_Builds';
import axiosInstance from '../../AxiosInstance';
import { ErrorHandlingNotif } from '../Misc/Error';
import BudgetDonut from '../Charts/BudgetDonut';
import BudgetBar from './BudgetBar';


const Tabs = ({ id }) => {

    const [toggleTabs, setToggleTabs] = useState(1);
    const [submitting, setSubmitting] = useState(true);
    const [currentCardName, setCurrentCardName] = useState(null)
    const [currentPartsData, setCurrentPartsData] = useState(null)

    const { autoCompleteState0 , autoCompleteState1, } = useContext(CompBuildPageData)


    const Toggler = (index) => {
        setToggleTabs(index);
    };

    useEffect(() => {
        switch(id) {
            case 0:
                setCurrentCardName(autoCompleteState0)
                break;
            default:
                setCurrentCardName(autoCompleteState1)
                break;
        }
    },[autoCompleteState0, autoCompleteState1, id])

    useEffect(() => {
        const getPartsData = async () => {
            try {
                const response = await axiosInstance.get('/Builder/find')

                const selectedCard = response.data.CardArray.filter((card) => card.CardName === currentCardName)
                if (selectedCard.length > 0) {
                    setCurrentPartsData(selectedCard[0].partsData)
                    setSubmitting(false)
                }
                
            } catch(err) {
                console.log(err)
                ErrorHandlingNotif()
            }
        }

        if(submitting) {
            getPartsData()
        }
    },[currentCardName, submitting])


    return (
        <div className="w-1/2 h-full border rounded-md shadow-md">
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
                <div id={`first ${id}`} 
                className={ toggleTabs === 1 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                First tab
                </div>
                <div id={`second ${id}`} className={ toggleTabs === 2 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                Second tab
                </div>
                <div id={`third ${id}`} className={ toggleTabs === 3 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                Third tab
                </div>
                <div id={`fourth ${id}`} className={ toggleTabs === 4 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                Fourth tab
                </div>
                <div id={`fifth ${id}`} className={ toggleTabs === 5 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                Fifth tab
                </div>
                <div id={`sixth ${id}`} className={ toggleTabs === 6 ? "block p-4"
                    :
                    "hidden p-4"
                    }
                >
                Sixth tab
                </div>
                <form id={`Budget ${id}`} className={ toggleTabs === 7 ? "flex flex-col items-center p-4 w-full h-full "
                    :
                    "hidden p-4"
                    }
                >
                <BudgetBar id={id}/>
                <BudgetDonut/>
                </form>
            </div>
        </div>
    )
}

export default Tabs
