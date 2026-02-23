import Header from "../components/Header";

import { useState } from "react";

import Drawer from "../components/Drawer";

export default function Decks() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleDeckCreation = () => {
        //open a form page to create deck 
        setDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }


    return (
        <>
            <Header title='Decks' />

            {isDrawerOpen &&
                <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} />
            }
            {/* 
            <DecksList decks={decks} />
            <Button function={handleDeckCreation} icon='+' /> */}
        </>
    );
}