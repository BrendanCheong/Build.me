import Cards from "../components/Cards"
import Uncard from "../components/Uncard"
import {useState, useEffect, createContext,} from 'react'
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
    

    const uncardSchema = {CardName:"Enter Name Here" ,isUncard: true, _id: 1, partsData:[
        {name:"CPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"Motherboard",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"GPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"Memory",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"PSU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
    ]}
    
    const cardSchema = {CardName:"Enter Name Here", isUncard: false,
    partsData: [
        {name:"CPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"Motherboard",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"GPU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"Memory",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
        {name:"PSU",itemName:"",itemPrice:"",itemImg:"",itemRating:"",vendorName:"", isUnPart: true},
    ]};
    

    const [cards,setCards] = useState([
        uncardSchema,
    ]);
    const [submitting, setSubmitting] = useState(true);
    // GET request ALL CARDS
    const getAllCards = async () => {
        try {

            const response = await axiosInstance.get('/Builder/find')
            // console.log(response.data.CardArray)
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
            if (State.length <= 2) { // awlays have an Uncard at the end, uncard not in acutal DB
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
        const response = await DeleteCard(id)
        setSubmitting(true)
        // console.log(response)
    };

    const addCards = async () => {
        const response = await PostCard(cardSchema);
        setSubmitting(true)
        // console.log(response)
    };

    const changeNewParts = async (name, id, toChange) => {
        // run through cards to find the matching id
        // now run through cards.partsData to find the matching name
        // map function confuses me lmao
        const newData = []
        for (let i = 0; i < cards.length; i++) {
            if (cards[i]._id === id) {
                for (let j = 0; j < cards[i].partsData.length; j++) {
                    if (cards[i].partsData[j].name === name) {
                        cards[i].partsData[j].isUnPart = toChange
                        
                    }
                    newData.push(cards[i].partsData[j])
                }
            }
        }
        const response = await PatchCard(id, {partsData: newData})
        setSubmitting(true)
        // console.log(response)
    };


    return (
        <div className="grid h-screen grid-cols-3 bg-gray-100 place-items-center">
            {cards.map((card) => ( card.isUncard ?

            <ContextData.Provider value={{addCards, handleDelete,changeNewParts,card}}>
                <Uncard key={card._id}/>
            </ContextData.Provider> // if render Uncard boolean

            : 

            <ContextData.Provider value={{addCards, handleDelete,changeNewParts,card}}>
                <Cards key={card._id}/> 
            </ContextData.Provider> // render Card boolean
            ))}
        </div>
    )
}

export default Builds
