import { Link } from 'react-router-dom';

const Card = ({ height, type, forceUpdate }) => {

    const divStyle = {
        display: "grid",
        height: height,
        placeItems: "center",
    };
    const object = JSON.parse(localStorage.getItem(type));
    let currentPrice = object.itemPrice || "";
    const storePage = object.itemURL;

    const removeItem = (type) => {
        localStorage.removeItem(type)
        forceUpdate();
    }
    const MouseOver = (event) => {
        event.target.textContent = "Store Page"
    }
    const MouseExit = (event) => {
        event.target.textContent = `S$ ${currentPrice}`
    }
    
    return (
        <div className="antialiased text-white" style={divStyle}>
            <div>
            <img src={object.itemImg} alt="Product imgee" className="object-cover object-center w-full rounded-lg shadow-md" style={{width: "350px", height: "350px"}}/>    
                <div className="relative px-4 -mt-16 ">
                    <div className="items-center flex-shrink-0 h-56 p-6 text-center rounded-lg shadow-lg bg-gradient-to-br from-purple-600 to-indigo-600">
                        <div className="space-y-1">
                            <h4 className="w-56 h-16 mt-1 ml-5 text-lg font-semibold leading-tight text-center font-poppins">{object.itemName}</h4>
                                <div className="mt-1">
                                    Vendor:
                                    <span className="ml-1 text-base text-teal-200 font-roboto">
                                        {object.vendorName}
                                    </span>
                                </div>
                            <div className="mt-1">
                                <a className="px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-teal-500 text-md hover:from-yellow-500 hover:to-red-500 font-roboto" name="ItemPrice" onMouseOver={MouseOver} onMouseLeave={MouseExit} href={storePage} target="_blank" rel="noreferrer">{`S$ ${currentPrice}`}</a>
                            </div>
                        </div>
                            
                        <div className="relative flex flex-row justify-between mt-1 -bottom-7">
                            <Link className="px-3 py-1 font-semibold text-indigo-100 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-teal-500 hover:text-white focus:outline-none" to={`/Public_Builds/${type}`}>Change</Link>
                            <button className="px-3 py-1 font-semibold text-indigo-100 uppercase duration-300 rounded-full hover:shadow-md text-md hover:bg-red-500 hover:text-white focus:outline-none" onClick={() => removeItem(type)}>Remove</button>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
