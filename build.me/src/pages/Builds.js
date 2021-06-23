import BuildCard from '../components/BuildPageComp/BuildCard';
import BuildUnCard from "../components/BuildPageComp/BuildUnCard";
import {useState, useEffect, createContext, useMemo} from 'react'
import axiosInstance from "../AxiosInstance";


export const ContextData = createContext(null)

const Builds = () => {
    /*
    whats being passed through as props?
    id: int -> unique id of each card
    addCards: func -> passed to unCards to add cards
    addNewParts: func -> passed to Cards -> to unParts
    handleDelete: func -> passed to Cards to delete cards
    partsData: list => obj -> passed to Cards -> passed to Parts
    */
    
    const uncardSchema = useMemo(() => {
        return ({CardName:"" ,isUncard: true, _id: 1, partsData:[
            {name:"CPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
            {name:"Motherboard",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
            {name:"GPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
            {name:"Memory",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
            {name:"PSU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
            {name:"Storage",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        ]})
    },[])
    
    const cardSchema = {CardName:"", isUncard: false,
    partsData: [
        {name:"CPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        {name:"Motherboard",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        {name:"GPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        {name:"Memory",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        {name:"PSU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
        {name:"Storage",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true, itemURL:""},
    ]};
    

    const [cards,setCards] = useState([
        uncardSchema,
    ]);
    const [submitting, setSubmitting] = useState(true);
    
    // GET request ALL CARDS
    const getAllCards = async () => {
        try {

            const response = await axiosInstance.get('/Builder/find')
            
            return response.data.CardArray

        } catch(err) {
            return err
        }
    }
    

    const PostCard = async (postCardData) => {
        try {
            const response = await axiosInstance.put('/Builder/addCard',postCardData)
            
            return response.data
        } catch(err) {
            return err
        }
    }

    const DeleteCard = async (id) => {
        try {
            const response = await axiosInstance.delete(`/Builder/${id}`)
            return response.data
        } catch(err) {
            return err
        }
    }

    const PatchCard = async (id, partData) => {
        try {
            const response = await axiosInstance.patch(`/Builder/${id}`,partData)
            return response.data

        } catch(err) {
            return err
        }
    }

    useEffect(() => { // updates the State after every render
        const updateState = async () => {
            const State = await getAllCards()
            if (State.length <= 3) { // awlays have an Uncard at the end, uncard not in acutal DB, also sets max number of Builds on Page
                State.push(uncardSchema)
            }
            setCards(State);
            setSubmitting(false)
            
        }
        if (submitting) {
            updateState();
        }
    }, [submitting, uncardSchema])
    

    const handleDelete =  async (id) => {
        await DeleteCard(id).catch(err =>console.error(err))
        setSubmitting(true)
    };

    const addCards = async () => {
        await PostCard(cardSchema).catch(err =>console.error(err))
        setSubmitting(true)
        // console.log(response)
    };

    const changeNewParts = async (name, id, toChange) => {
        // run through cards to find the matching id
        // now run through cards.partsData to find the matching name
        
        const newData = []
        for (let i = 0; i < cards.length; i++) {
            if (cards[i]._id === id) {
                for (let j = 0; j < cards[i].partsData.length; j++) {
                    if (cards[i].partsData[j].name === name) {
                        cards[i].partsData[j].itemName = ""
                        cards[i].partsData[j].itemPrice = ""
                        cards[i].partsData[j].itemImg = ""
                        cards[i].partsData[j].itemRating = ""
                        cards[i].partsData[j].vendorName = ""
                        cards[i].partsData[j].itemURL = ""
                        cards[i].partsData[j].isUnPart = toChange
                        delete cards[i].partsData[j].itemID
                        
                    }
                    newData.push(cards[i].partsData[j])
                }
            }
        }
        await PatchCard(id, {partsData: newData}).catch(err => console.error(err))
        setSubmitting(true)
    };


    return (
        <div className="flex flex-row items-start h-screen p-2 space-x-3 overflow-hidden overflow-x-auto bg-gray-100 scrollbar-thin scrollbar-thumb-trueGray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-blueGray-500">
            {cards.map((card) => ( card.isUncard ?

            <ContextData.Provider value={{addCards, handleDelete, changeNewParts, setSubmitting, card, submitting}} key={card._id}>
                <BuildUnCard key={card._id}/>
            </ContextData.Provider> // if render Uncard boolean

            : 

            <ContextData.Provider value={{addCards, handleDelete, changeNewParts, setSubmitting, card, submitting, cards}} key={card._id}>
                <BuildCard key={card._id}/> 
            </ContextData.Provider> // render Card boolean
            ))}
        </div>
    )
}

export default Builds
