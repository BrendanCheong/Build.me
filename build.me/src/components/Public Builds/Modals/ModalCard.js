import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

const ModalCard = ({ itemName, itemURL, scrapType,
                    itemImg, itemPrice, itemVendor, itemRating, Name, rowOriginal}) => {
    const history = useHistory();

    function WhatIsItemName (partType) {
        switch(partType) {
            case 'GPU':
                return (`${rowOriginal.itemBrand} ${rowOriginal.itemChipSet}`)
            default:
                return (`${rowOriginal.itemBrand} ${rowOriginal.itemName}`)
        }
    }

    const AddToLocalStorage = (Name) => {
        const object = {
            itemName: WhatIsItemName(Name),
            itemImg: itemImg,
            itemPrice: itemPrice,
            itemURL: itemURL,
            itemID: rowOriginal._id,
            vendorName: itemVendor ==="NA" ? scrapType : itemVendor,
            name: Name,
        }
        localStorage.setItem(Name, JSON.stringify(object))
        return history.push("/Public_Builds")
    }
    
    return (
        <div>
            
                <div className="container h-full mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="p-4 w-80">
                            <div className="block overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl">
                                <div className="relative pb-48 overflow-hidden">
                                    <img className="absolute inset-0 object-cover w-full h-full" src={itemImg} alt="Product Imgee"></img>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-row justify-between">
                                        <a className="inline-block px-2 py-1 text-sm font-semibold leading-none tracking-wide text-teal-800 uppercase duration-300 bg-teal-200 rounded-full shadow-md font-poppins focus:outline-none hover:bg-indigo-200 hover:text-indigo-800" href={itemURL}
                                        target="_blank" rel="noreferrer"
                                        >Store Page</a>
                                        <button className="inline-block px-2 py-1 text-sm font-semibold leading-none tracking-wide text-teal-800 uppercase duration-300 bg-teal-200 rounded-full shadow-md font-poppins focus:outline-none hover:bg-indigo-200 hover:text-indigo-800" onClick={() => AddToLocalStorage(Name)}>Add to Build</button>
                                    </div>
                                    <h2 className="w-full h-24 mt-2 mb-2 font-sans font-semibold">{itemName}</h2>
                                    <div className="flex items-center mt-3">
                                        <span className="text-sm font-semibold">S$</span>&nbsp;<span className="text-xl font-bold font-roboto">{itemPrice}</span>&nbsp;
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <span className="text-sm font-semibold">Vendor:</span>&nbsp;
                                        <span className="text-lg font-medium font-roboto">{itemVendor ==="NA" ? scrapType : itemVendor }</span>&nbsp;
                                    </div>
                                </div>
                                <div className="flex flex-row p-4 text-base text-gray-700 border-t border-b font-roboto">
                                    <Rating name="product rating" 
                                    defaultValue={parseInt(itemRating)} 
                                    precision={0.5}
                                    max={5}
                                    readOnly
                                    />
                                    <h4 className="px-2">{`${itemRating} / 5 Stars`}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
        </div>
    )
}

export default ModalCard
