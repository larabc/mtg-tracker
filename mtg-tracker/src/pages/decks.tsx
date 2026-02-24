
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Drawer from "../components/Drawer";
import DecksList from "../components/DecksList";
import { v4 as uuidv4 } from 'uuid';
import type { Deck, NewDeck } from "../types";

export default function Decks() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const storedDecks = localStorage.getItem('decks');
        if (storedDecks) {
            setDecks(JSON.parse(storedDecks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('decks', JSON.stringify(decks));
    }, [decks]);

    const handleDeckCreation = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const createDeck = (props: NewDeck) => {
        const newDeck = { ...props, id: uuidv4(), createdAt: new Date().toISOString() };
        setDecks(prev => [...prev, newDeck]);
    };

    return (
        <>
            <Header title="Decks" />
            {isDrawerOpen && (
                <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} createDeck={createDeck} />
            )}
            <DecksList decks={decks} />
            <button onClick={handleDeckCreation}>New deck</button>
        </>
    );
}