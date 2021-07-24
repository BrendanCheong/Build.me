import { useContext } from "react";
import { DashboardData } from "./DashboardTab";
import Rating from "@material-ui/lab/Rating";

const BestSeller = () => {
    
    const { cardData } = useContext(DashboardData);
    const ProductRating = cardData.ProductRating || "";
    const rates = parseFloat(ProductRating.replace(" out of 5 stars", ""));
    
    return (
        <div className="max-w-sm mx-auto my-8 overflow-hidden shadow-lg rounded-xl">
            <div className="relative w-full h-56 bg-white">
                <img className="absolute object-cover w-full h-full rounded-lg" src={(() => {

                    const imgLink = cardData.ProductImg
                    return imgLink
                    })()}
                    alt="Product Power"/>
            </div>
            <div className="px-6 py-4 space-y-3 bg-white">
                <div className="mb-2 text-xl font-bold">{cardData.ProductName}</div>
                <p className="text-lg text-gray-600 font-roboto">
                {`Current Price: S$ ${cardData.CurrentPrice}`}
                </p>
                <div className="flex flex-row">
                    <Rating name="product rating" 
                    defaultValue={rates || parseFloat(ProductRating.replace(" out of 5 stars", ""))} 
                    precision={0.5}
                    max={5}
                    readOnly
                    />
                </div>
                <a alt="Bring me to Best Sellers Page" 
                href={cardData.ProductURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center py-2 text-base font-medium text-white duration-300 delay-300 border border-transparent rounded-full shadow-md px-7 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-700 hover:to-teal-700 focus:outline-none font-poppins"
                >
                    Store Page
                </a>
            </div>
        </div>
    )
}

export default BestSeller
