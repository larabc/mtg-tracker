

import useMatches from "../hooks/useMatches";
import type { Deck } from "../types";
import { calculateWinRate } from "../utils/calculateWinRate";
import { COLOR_MAP } from "../utils/colorMap";

export default function DecksList({ decks }: { decks: Deck[] }) {

    const { matches } = useMatches();


    return (
        <>
            {
                decks.map(deck => {

                    const deckMatches = matches.filter(match => match.deckId === deck.id)
                    const winRate = calculateWinRate(deckMatches)
                    return (
                        <div key={deck.id} className="flex justify-between items-center px-4 py-4 border-b border-zinc-800">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                    {
                                        deck.colors.map(color => (
                                            <span key={color} className={`inline-block w-3 h-3 rounded-full ${COLOR_MAP[color]}`} />))
                                    }
                                </div>
                                <h2 className="text-white font-bold">{deck.name}</h2>
                            </div>
                            <p className="text-zinc-400 text-sm">{winRate}%</p>
                        </div>
                    )
                })
            }
        </>
    );
}