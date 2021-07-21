import { useEffect } from "react";
import Card from "./Card";
import UnCard from "./UnCard";

const State = ({ type, short, height}) => {

    
    const PartData = JSON.parse(localStorage.getItem(type))

    useEffect(() => {
        const CardSchema = {name:type,itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", itemURL:""}
        
        if (!PartData) {
            localStorage.setItem(type, JSON.stringify(CardSchema))
        }
    },[type, PartData])

    return (
        <>
            {(() =>{
                if (!PartData) return (<UnCard type={type} short={short}/>)
                else if (!PartData.itemName) return (<UnCard type={type} short={short}/>)
                else return (<Card type={type} height={height}/>)
            })()}
        </>
    )
}

export default State
