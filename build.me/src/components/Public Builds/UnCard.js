import CPUsvg from './svg/CPUsvg';
import GraphicCardsvg from './svg/GraphicCardsvg';
import Motherboardsvg from './svg/Motherboardsvg';
import PSUsvg from './svg/PSUsvg';
import RAMsvg from './svg/RAMsvg';
import Storagesvg from './svg/Storagesvg';
import { Link } from 'react-router-dom';

const UnCard = ({ type, short }) => {

    const divStyle = {
        display: "grid",
        height: "90vh",
        placeItems: "center",
        marginTop: "2.25rem",
    }
    return (
        <div className={ short ? "antialiased text-gray-900 mt-9" : "antialiased text-gray-900"} style={{divStyle}}>
            <div>
                <div className="flex flex-col items-center justify-center space-y-5 rounded-lg shadow-md bg-gradient-to-br from-blueGray-200 to-warmGray-100" style={{width: "350px", height: "350px"}}>
                    <div className="w-full h-4/6"></div>
                    {(()=> {
                switch(type) {
                    case "CPU":
                        return (<CPUsvg key={type}/>)
                    case "Motherboard":
                        return (<Motherboardsvg key={type}/>)
                    case "GPU":
                        return (<GraphicCardsvg key={type}/>)
                    case "Memory":
                        return (<RAMsvg key={type}/>)
                    case "PSU":
                        return (<PSUsvg key={type}/>)
                    default:
                        return (<Storagesvg key={type}/>)
                }
                    })()}
                    <h1 className="w-full h-full text-2xl font-semibold leading-tight truncateo font-poppins">{type}</h1>
                </div>    
                <div className="relative px-4 -mt-16">
                    <div className="p-6 rounded-lg shadow-lg bg-gradient-to-tl from-white to-blueGray-100">
                            <h4 className="mt-1 text-2xl font-semibold leading-tight uppercase truncateo font-roboto">Add</h4>
                        <div className="flex flex-col items-center w-full">
                            <svg className="w-24 h-24 mt-4 duration-300 cursor-pointer hover:text-teal-500 hover:fill-current" fill="#5EEAD4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" className=""/></svg>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnCard
