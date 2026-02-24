import DeckForm from "./DeckForm";
import type { NewDeck } from "../types";

type DrawerProps = {
    isOpen: boolean,
    onClose: () => void,
    createDeck: (deck: NewDeck) => void
};

export default function Drawer({ onClose, createDeck }: DrawerProps) {
    const handleSubmit = (newDeck: NewDeck) => {
        createDeck(newDeck);
        onClose();
    };

    return (
        <div>
            <DeckForm onSubmit={handleSubmit} />
            <button onClick={onClose}>Close</button>
        </div>
    );
}