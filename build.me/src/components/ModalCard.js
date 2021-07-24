import axiosInstance from "../AxiosInstance";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

const ModalCard = ({ id, card, Name,
    itemName, itemURL, scrapType,
    itemImg, itemPrice, itemVendor, itemRating, rowOriginal}) => {


    const partType = Name // partType: CPU,Motherboard, GPU etc

    const Price = itemPrice

    const ItemRating = itemRating

    const VendorName = itemVendor

    const itemURLink = itemURL

    const itemImage = itemImg

    const history = useHistory()

    // include part type switch statement here
    function WhatIsItemName (partType) {
        switch(partType) {
            case 'GPU':
                return (`${rowOriginal.itemBrand} ${rowOriginal.itemChipSet}`)
            default:
                return (`${rowOriginal.itemBrand} ${rowOriginal.itemName}`)
        }
    }

    // PATCH request for a CARD
    const PatchCard = async (id, partData) => {
        try {
            const response = await axiosInstance.patch(`/Builder/${id}`,partData)
            return response.data

        } catch(err) {
            return err
        }
    }

    const CleanData = async (card) => { // adds to the Builds Page Part component
        const Data = [...card.partsData]
        for (let i = 0; i < Data.length; ++i) {
            if(Data[i].name === partType) {
                Data[i].itemName = WhatIsItemName(partType) // I must have Brand + Name! // changes according to partType
                Data[i].itemPrice = Price
                Data[i].itemImg = itemImage
                Data[i].itemRating = ItemRating
                Data[i].itemURL = itemURLink
                Data[i].vendorName = VendorName
                Data[i].itemID = rowOriginal._id
                Data[i].isUnPart = false
            }
        }
        const answer = {partsData: Data}
        await PatchCard(id, answer).catch(err => console.error(err))
        history.push('/Builds')
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
                                        <button className="inline-block px-2 py-1 text-sm font-semibold leading-none tracking-wide text-teal-800 uppercase duration-300 bg-teal-200 rounded-full shadow-md font-poppins focus:outline-none hover:bg-indigo-200 hover:text-indigo-800" onClick={() => CleanData(card)} name={scrapType}>Add to Build</button>
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
                                    defaultValue={parseFloat(itemRating)} 
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

