import axiosInstance from "../AxiosInstance";
import { Link } from "react-router-dom";

const ModalCard = ({ id, card, name, info, rowOriginal }) => {

    const partType = name // partType: CPU,Motherboard, GPU etc

    const Name = info.itemName

    const Price = info.itemPrice

    const Rating = info.itemRating

    const VendorName = info.vendorName

    const itemURL = info.itemURL

    const itemImage = info.itemImg



    function NameShortern (name) {
        if (name.length >= 27) {
            const newName = name.slice(0,24) + ".."
            return newName;
        } else {
            return name
        }
    }

    // PATCH request for a CARD
    const PatchCard = async (id, partData) => {
        try {
            const response = await axiosInstance.patch(`/Cards/${id}`,partData)
            return response.data
        } catch(err) {
            return err
        }
    }

    const CleanData = async (card) => { // adds to the Builds Page Part component
        const Data = [...card.partsData]
        for (let i = 0; i < Data.length; ++i) {
            if(Data[i].name === partType) {
                Data[i].itemName = `${rowOriginal.Brand} ${rowOriginal.Name}` // I must have Brand + Name!
                Data[i].itemPrice = Price
                Data[i].itemImg = itemImage
                Data[i].itemRating = Rating
                Data[i].isUnPart = false
            }
        }
        const answer = {partsData: Data}
        const response = await PatchCard(id, answer)
        console.log(response)
    }
    
    return (
            <div className='flex-shrink-0 w-3/12 overflow-hidden bg-white rounded-md shadow-lg'>
                    <button className='bg-transparent hover:bg-gray-100 focus:outline-none' onClick={() => console.log(card)}>
                        {/** Image Block start */}
                            <div className='relative h-40'>
                                <img className='absolute object-cover w-full h-full p-1 rounded-lg' src={itemImage} alt="Product Artistry" />
                            </div>
                        {/** Image Block end */}
                        {/** Grid Info Start */}
                            <div className='p-4'>
                                <h2 className='pb-2 text-xl text-left'>{NameShortern(Name)}</h2>
                                <div className="flex flex-col space-y-2 text-left">
                                    <div className="text-2xl font-semibold text-indigo-600">{Price}</div>
                                    <div className="flex flex-row space-x-1 font-poppins ">
                                        <div>Rating:</div>
                                        <div className="font-semibold underline">{Rating.slice(0,3)}</div>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <div>/5</div>
                                    </div>
                                    <div className= "font-poppins">{`Vendor: ${VendorName}`}</div>
                                </div>
                            </div>
                        {/** Grid Info End */}
                    </button>
                <div className='flex flex-row pt-2 pb-2 pl-3 space-x-20'>
                    <a className='px-2 py-1 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100' href={itemURL} target="_blank" rel="noreferrer">
                        STORE PAGE
                    </a>
                    <Link className='px-2 py-1 text-sm font-medium text-indigo-600 duration-300 bg-transparent rounded-full focus:outline-none hover:bg-indigo-100' to="/Builds" onClick={() => CleanData(card)}>
                        ADD TO BUILD
                    </Link>
                </div>
            </div>
    )
}

export default ModalCard

