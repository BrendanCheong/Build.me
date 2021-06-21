import { useState, useContext, useEffect, useCallback } from 'react';
import { CompBuildPageData } from '../../pages/Compare_Builds';
import axiosInstance from '../../AxiosInstance';
import { ErrorHandlingNotif } from '../Misc/Error';
import BudgetDonut from '../Charts/BudgetDonut';
import BudgetBar from './BudgetBar';


const Tabs = ({ id }) => {


    const [toggleTabs, setToggleTabs] = useState(1);
    const [submitting, setSubmitting] = useState(true); // this is for loading screen for async
    const [currentCardName, setCurrentCardName] = useState(null)
    const [currentPartsData, setCurrentPartsData] = useState(null)
    const [DonutAppear, setDonutAppear] = useState(false)
    const [dataSetArray, setDataSetArray] = useState([])
    const [labelArray, setLabelArray] = useState([])
    const [ColorArray, setColorArray] = useState([])
    const [values, setValues] = useState({
        textmask: '(1  )    -    ',
        numberformat: '',
        });

    const { autoCompleteState0 , autoCompleteState1, setLoadingData} = useContext(CompBuildPageData)

    function CalculateRemainingAmt(arr) {
        const total = arr.reduce((a, b) => a + b)
        return (100 - total)
    }

    function LabelListCalc(arr) {
        let NewLabelArr = []
        let NewColorArr = []
        const labelArr = ['CPU','Motherboard','GPU','Memory','PSU','Storage','Remaining Budget']
        const ColorArr = ['#159dfb', '#c83955', '#FFD166', '#17d993', '#9CFFFA', '#2BD9FE', '#623CEA', '#DFB2F4', '#D36135', '#EF476F ']
        for (let i = 0; i < arr.length; ++i) {
            if( arr[i] ) {
                NewLabelArr.push(labelArr[i])
                NewColorArr.push(ColorArr[i])
            }
        }
        setLabelArray(NewLabelArr)
        setColorArray(NewColorArr)
    }

    const PercentageCalculator = useCallback((data) => {
        const CurrentBudget = parseFloat(values.numberformat)
        const itemPriceArray = data.map((item) => item.itemPrice ? parseFloat(item.itemPrice.replace('S$',"")) : 0)
        const SumPriceArray = itemPriceArray.reduce((a,b) => a + b)
        if (SumPriceArray > CurrentBudget) {
            console.log('Budget is too low!') 
            return 'Budget is too low!'
            // error handling
        }
        let PercentageArray = itemPriceArray.map((item) => item ? parseFloat(((item / CurrentBudget) * 100).toFixed(2)) : 0 )
        const RemainingAmt = CalculateRemainingAmt(PercentageArray)
        PercentageArray.push(RemainingAmt)
        const FilterPercentageArr = PercentageArray.filter((item) => item > 0)
        setDataSetArray(FilterPercentageArr)
        LabelListCalc(PercentageArray)

    },[values.numberformat])

    const Toggler = (index) => {
        setToggleTabs(index);
    };

    const SubmitBudget = (event) => {
        event.preventDefault();
        if (values.numberformat.length > 0) {
            setDonutAppear(true)
            PercentageCalculator(currentPartsData)
        } else {
            setDonutAppear(false)
        }
        
    }


    useEffect(() => { // decide which tab gets which appropiate state
        switch(id) {
            case 0:
                setCurrentCardName(autoCompleteState0)
                setSubmitting(true)
                setLoadingData(true)
                break;
            default:
                setCurrentCardName(autoCompleteState1)
                setSubmitting(true)
                setLoadingData(true)
                break;
        }
    },[autoCompleteState0, autoCompleteState1, id, setLoadingData])

    useEffect(() => { // when currentCardName for tab is selected, auto search for that unique name Card's partsData
        const getPartsData = async () => {
            try {
                const response = await axiosInstance.get('/Builder/find')

                const selectedCard = response.data.CardArray.filter((card) => card.CardName === currentCardName)
                if (selectedCard.length > 0) {
                    setCurrentPartsData(selectedCard[0].partsData)
                    setSubmitting(false) // *** might cause bugs ***
                    PercentageCalculator(currentPartsData)
                    
                }
                
            } catch(err) {
                console.log(err.message)
                if (err.message !=="Cannot read property 'map' of null") {
                    ErrorHandlingNotif()
                }
                
            }
        }

        if(submitting) {
            getPartsData()
        }
    },[currentCardName, submitting,PercentageCalculator,currentPartsData,])


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
                <form id={`Budget ${id}`} className={ toggleTabs === 7 ? "flex flex-col items-center p-4 w-full h-full"
                    :
                    "hidden p-4"
                    }
                onSubmit={SubmitBudget}
                >
                {currentPartsData && <BudgetBar id={id} values={values} setValues={setValues}/>}
                {DonutAppear && <BudgetDonut dataSetArray={dataSetArray} labelArray={labelArray} ColorArray={ColorArray}/>}
                </form>
            </div>
        </div>
    )
}

export default Tabs
