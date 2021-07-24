import { useEffect, useState } from "react";
import ModalCard from "../../components/ModalCard";

const LoadedSection = ({ rowOriginal, infoState, Name, scrapType, id, card}) => {

    const [recommended, setRecommended] = useState(null);
    const [suggestions, setSuggestions] = useState(null);

    const partition = (arr, condition) => {

        const recommended = arr.filter(el => condition(el));
        const suggestions = arr.filter(el => !condition(el));
        return [recommended, suggestions];
    }
    
    const Cleaner = (infoState) => {
        switch(Name) {
            case ("CPU"):
                function condition1(item) {
                    const itemName = item.itemName;
                    return (itemName.includes(rowOriginal.itemName + " ") && itemName.includes(rowOriginal.itemBrand + " ")) 
                }
                return partition(infoState, condition1);
                
            case ("GPU"):
                function condition2(item) {
                    const itemName = item.itemName;
                    return (itemName.includes(rowOriginal.itemChipSet + " ") && itemName.includes(rowOriginal.itemBrand + " "))
                }
                return partition(infoState, condition2)
            default:
                function condition3(item) {
                    const itemName = item.itemName;
                    return (itemName.includes(rowOriginal.itemBrand))
                }
                return partition(infoState, condition3)
        }
    }

    useEffect(() => {
        const Arr = Cleaner(infoState);
        setRecommended(Arr[0]);
        setSuggestions(Arr[1]);
    },[])
    
    return (
        <>
            <section className="flex flex-col w-full h-full p-5 bg-white space-y-7" id="Loaded Card">
                {/* <button onClick={() => console.log(Cleaner(infoState))}>Test</button> */}
                <span className="h-16 text-3xl text-center rounded-sm w-44">
                    <h2 className="py-2 ml-5 font-bold text-indigo-800 bg-indigo-200 font-poppins rounded-xl">{scrapType}</h2>
                </span>
                <div className="flex flex-row space-x-5">
                    {/** Recommended Section */}
                    <div className="p-5 -space-y-5 rounded-lg shadow-sm from-blueGray-100 bg-gradient-to-br to-gray-100" id="Recommended block" style={{height:"36rem"}}>
                        <div className="w-56 h-16 text-xl rounded-sm">
                            <h3 className="ml-5 font-bold text-black font-poppins">Recommended</h3>
                        </div>
                        <section className="flex flex-row items-center space-x-5">
                            {(() => {
                                if (recommended && recommended.length > 0) {
                                    return (<>
                                        { recommended.map((product) =>
                                                <ModalCard key={product.itemName + " recommended"} itemName={product.itemName.length > 80 ? product.itemName.slice(0,80) + "..." : product.itemName}
                                                itemURL={product.itemURL} itemImg={product.itemImg} itemPrice={product.itemPrice.replace("S$", "")}
                                                itemVendor={product.itemVendor} itemRating={product.itemRating.replace(" out of 5 stars", "")}
                                                scrapType={scrapType} Name={Name} rowOriginal={rowOriginal} id={id} card={card}/>
                                            )
                                        }
                                    </>)
                                } else {
                                    return (<></>)
                                }
                            })()}
                        </section>
                    </div>
                    {/** Suggestions Section */}
                    <div className="p-5 -space-y-5" id="Suggestions block">
                        <div className="h-16 text-lg rounded-sm w-96">
                            <h3 className="ml-5 font-bold text-black font-poppins">Can't find what you're looking for? Here's some Suggestions</h3>
                        </div>
                        <section className="flex flex-row items-center space-x-5">
                            {(() => {
                                    if (suggestions && suggestions.length > 0) {
                                        return (<>
                                            { suggestions.map((product) =>
                                                    <ModalCard key={product.itemName + " suggestions"} itemName={product.itemName.length > 100 ? product.itemName.slice(0,100) + "..." : product.itemName}
                                                    itemURL={product.itemURL} itemImg={product.itemImg} itemPrice={product.itemPrice.replace("S$", "")}
                                                    itemVendor={product.itemVendor} itemRating={product.itemRating.replace(" out of 5 stars", "")}
                                                    scrapType={scrapType} Name={Name} rowOriginal={rowOriginal} id={id} card={card}/>
                                                )
                                            }
                                        </>)
                                    } else {
                                        return (<></>)
                                    }
                            })()}
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoadedSection
