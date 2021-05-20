import Cards from "../components/Cards"
import Uncard from "../components/Uncard"
import {useState, useEffect} from 'react'

const Builds = () => {
    const [cards,setCards] = useState([
        {id:1, body: Uncard, isUncard: true},
    ]);

    const handleDelete = (id) => {
        const newCards = cards.filter(card => card.id !== id)
        if (newCards[newCards.length - 1].isUncard === false ) {
            newCards.push({id:1, body: Uncard, isUncard: true})
        }
        setCards(newCards);
    };

    const addCards = () => {
        // check the length of cards, before changing the state of cards
        // right now I only allow 3 cards, I pass the addCards func to the Uncard button
        // right now the card id is random, while Uncard is fixed at 1
        const newCards = [...cards]
        let cardsLength = cards.length
        const newId = Math.random()
        if (cardsLength === 3) {
            newCards.pop()
            newCards.push({id:newId, body: Cards, isUncard: false})
        } else {
            newCards.unshift({id:newId, body: Cards, isUncard: false})
        }
        setCards(newCards);
    };

    useEffect(() => {
        console.log(cards)
    })

    return (
        <div className="grid h-screen grid-cols-3 bg-gray-100 place-items-center">
            {cards.map((card) => ( // cant pass prop name 'key' to other components omegalul
                <card.body id={card.id} addCards={addCards} handleDelete={handleDelete} key={card.id}/>
            ))}
        </div>
    )
}

export default Builds
