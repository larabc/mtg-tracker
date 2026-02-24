import type { Deck } from "../types";

export default function DecksList({ decks }: { decks: Deck[] }) {
    return (
        <>
            {
                decks.map(deck => (
                    <div key={deck.id}>
                        <p>{deck.name}</p>
                    </div>
                ))
            }
        </>
    );
}