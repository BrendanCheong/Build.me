import Cards from "../components/Cards"
import Uncard from "../components/Uncard"
import {useState, useEffect, createContext} from 'react'


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

    const uncardSchema = {id: 1, isUncard: true, partsData:[]}
    const cardSchema = {id: Math.random(), isUncard: false,
    partsData: [
    {name: 'CPU', partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing", isUnPart: true,},
    {name: 'Motherboard', partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing", isUnPart: true,},
    {name: 'GPU', partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing", isUnPart: true,},
    {name: 'Memory', partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing", isUnPart: true,},
    {name: 'PSU', partPrice: 0, partName: "Nil",vendorName: "Joe Mama", imageLink: "nothing", isUnPart: true,},
    ]};
    
    const [cards,setCards] = useState([
        uncardSchema,
    ]);

    const handleDelete = (id) => {
        const newCards = cards.filter(card => card.id !== id)
        if (newCards[newCards.length - 1].isUncard === false ) {
            newCards.push(uncardSchema)
        }
        setCards(newCards);
    };

    const addCards = () => {
        // check the length of cards, before changing the state of cards
        // right now I only allow 3 cards, I pass the addCards func to the Uncard button
        // right now the card id is random, while Uncard is fixed at 1
        const newCards = [...cards]
        let cardsLength = cards.length
        if (cardsLength === 3) {
            newCards.pop()
            newCards.push(cardSchema)
        } else {
            newCards.unshift(cardSchema)
        }
        setCards(newCards);
    };

    const changeNewParts = (name, id, toChange) => {
        // run through cards to find the matching id
        // now run through cards.partsData to find the matching name
        // map function confuses me lmao
        const newData = []
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                for (let j = 0; j < cards[i].partsData.length; j++) {
                    if (cards[i].partsData[j].name === name) {
                        cards[i].partsData[j].isUnPart = toChange
                    }
                }
            }
        newData.push(cards[i])}
        setCards(newData) // outside the loop
    };


    // useEffect(() => {
    //     console.log(cards)
    // })

    return (
        <div className="grid h-screen grid-cols-3 bg-gray-100 place-items-center">
            {cards.map((card) => ( card.isUncard ?

            <ContextData.Provider value={{addCards, handleDelete,changeNewParts,card}}>
                <Uncard key={card.id}/>
            </ContextData.Provider> // if render Uncard boolean

            : 

            <ContextData.Provider value={{addCards, handleDelete,changeNewParts,card}}>
                <Cards key={card.id}/> 
            </ContextData.Provider> // render Card boolean
            ))}
        </div>
    )
}

export default Builds
