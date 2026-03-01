
import Header from "../components/Header";
import { useState } from "react";
import Drawer from "../components/Drawer";
import DecksList from "../components/DecksList";
import useDecks from "../hooks/useDecks";
import { Plus } from 'lucide-react'

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
            <Header title="My Decks" />
            {isDrawerOpen && (
                <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} onSubmit={createDeck} />
            )}
            <DecksList decks={decks} />
            <button className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-amber-400 text-zinc-950 text-2xl font-bold flex items-center justify-center shadow-lg" onClick={handleDeckCreation}><Plus className="w-5 h-5" /></button>
        </>
    );
}