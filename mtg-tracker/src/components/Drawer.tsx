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
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div
                className="fixed bottom-0 left-0 w-full bg-zinc-900 rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose}>Close</button>
                <DeckForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}