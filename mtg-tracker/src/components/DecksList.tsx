import type { Deck } from "../types";

export default function DecksList(decks: Deck[]) {
    return (
        <>
            {
                decks.map(deck => {
                    <div>
                        <p>`${deck.name}`</p>
                    </div>
                })
            }
        </>
    );
}