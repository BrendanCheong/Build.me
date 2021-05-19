import Cards from "../components/Cards"
import Uncard from "../components/Uncard"
import {useState, useEffect} from 'react'

const Builds = () => {
    const [cards,setCards] = useState([
        {id:1, body: Uncard,},
    ]);

    const addCards = () => {
        // check the length of cards, before changing the state of cards
        // right now I only allow 3 cards, I pass the addCards func to the Uncard button
        const newCards = [...cards]
        let cardsLength = cards.length
        if (cardsLength === 3) {
            newCards.pop()
            newCards.push({id:1, body: Cards})
        } else {
            const newId = newCards[0].id + 1 // now the cards id is like 3,2,1
            newCards.unshift({id:newId, body: Cards})
        }
        setCards(newCards);
    };

    console.log(cards)

    return (
        <div className="grid h-screen grid-cols-3 bg-gray-100 place-items-center">
            {cards.map((card) => ( // cant name the prop as 'key' omegalul
                <card.body id={card.id} addCards={addCards}/>
            ))}
        </div>
    )
}

export default Builds
