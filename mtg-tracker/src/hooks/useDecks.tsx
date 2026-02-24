import { useState, useEffect } from "react";
import type { Deck } from "../types";
import type { NewDeck } from "../types";
import { v4 as uuidv4 } from 'uuid'

const useDecks = () => {
    const [decks, setDecks] = useState<Deck[]>([]);

    //Reads the state to get stored decks in localStorage and sets them in the live app state to be accessible during runtime.
    useEffect(() => {
        const storedDecks = localStorage.getItem('decks');
        if (storedDecks) {
            setDecks(JSON.parse(storedDecks));
        }
    }, [])

    //Writes on local storage the decks when any change is made on decks state.
    useEffect(() => {
        console.log('arrives to useEffect with decks', decks);

        if (decks.length > 0) {
            localStorage.setItem('decks', JSON.stringify(decks))
        }

    }, [decks]
    );

    function createDeck(props: NewDeck) {
        const newDeck = { ...props, id: uuidv4(), createdAt: new Date().toISOString() };
        setDecks([...decks, newDeck]);
    }

    function updateDeck(props: Deck) {
        //search for the deck with same ID stored and update its properties with the coming ones
        const deckId = props.id;
        const updatedDecks = decks.map(deck => {
            if (deck.id === deckId) {
                return props;
            }
            return deck;
        })

        setDecks(updatedDecks)

    }

    function deleteDeck(props: Deck) {
        //search for the deck with the same ID store and delete it from the array and call to the sate again
        setDecks(decks.filter(deck => deck.id !== props.id));
    }

    return { decks, createDeck, updateDeck, deleteDeck };
}

export default useDecks; 