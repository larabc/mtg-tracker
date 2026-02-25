import useDecks from "../hooks/useDecks";
import useMatches from "../hooks/useMatches";
import { calculateWinRate } from "../utils/calculateWinRate";


export default function Stats() {

    const { matches } = useMatches();
    const { decks } = useDecks();

    return (
        <>
            {decks.map(deck => {
                const deckMatches = matches.filter(match => match.deckId === deck.id)
                const winRate = calculateWinRate(deckMatches)
                return (
                    <div key={deck.id}>
                        <h2>{deck.name}</h2>
                        <p>{winRate}%</p>
                    </div>
                )
            })}
        </>
    )
}