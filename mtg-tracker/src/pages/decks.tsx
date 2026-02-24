
import Header from "../components/Header";
import { useState } from "react";
import Drawer from "../components/Drawer";
import DecksList from "../components/DecksList";
import useDecks from "../hooks/useDecks";

export default function Decks() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { decks, createDeck } = useDecks();

    const handleDeckCreation = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
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