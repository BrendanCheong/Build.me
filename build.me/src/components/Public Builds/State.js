import { useEffect, useReducer } from "react";
import Card from "./Card";
import UnCard from "./UnCard";

const State = ({ type, short, height}) => {

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

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
                if (!PartData || !PartData.itemID) return (<UnCard type={type} short={short}/>)
                else return (<Card type={type} height={height} forceUpdate={forceUpdate}/>)
            })()}
        </>
    )
}

export default State
