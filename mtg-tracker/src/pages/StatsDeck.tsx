import { useParams } from "react-router-dom"
import useDecks from "../hooks/useDecks";
import useMatches from "../hooks/useMatches";
import type { Match } from "../types";
import Header from "../components/Header";

const StatsDeck = () => {

    const params = useParams();
    const { decks } = useDecks();
    const { matches } = useMatches();

    const deck = decks.find(deck => deck.id === params.deckId);
    const deckMatches = matches.filter(match => match.deckId === params.deckId);

    const opponentStats = deckMatches.reduce((acc, match) => {
        const id = match.opponentDeckId;
        if (!acc[id]) acc[id] = [];
        acc[id].push(match);
        return acc;
    }, {} as Record<string, Match[]>)

    const wins = deckMatches.filter(m => m.result === '2-0' || m.result === '2-1').length;
    const draws = deckMatches.filter(m => m.result === '1-1').length;
    const losses = deckMatches.filter(m => m.result === '1-2' || m.result === '0-2').length;



    if (!deck) return <p className="text-zinc-400 p-4"> Deck not found</p>
    return (
        <>
            <Header title={deck.name} />

            <div className="flex flex-col gap-6 px-4 pt-4 pb-8">

                {/* Opponent breakdown */}
                <div className="flex flex-col gap-3">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">vs. Opponents</p>

                    {Object.entries(opponentStats).map(([opponentId, opponentMatches]) => {
                        const opponentDeck = decks.find(d => d.id === opponentId);
                        const oppWins = opponentMatches.filter(m => m.result === '2-0' || m.result === '2-1').length;
                        const oppDraws = opponentMatches.filter(m => m.result === '1-1').length;
                        const oppLosses = opponentMatches.filter(m => m.result === '1-2' || m.result === '0-2').length;

                        return (
                            <div key={opponentId} className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-semibold text-sm">
                                        {opponentDeck?.name ?? 'Unknown'}
                                    </span>
                                    <span className="text-zinc-500 text-xs">{opponentMatches.length} matches</span>
                                </div>
                                <div className="flex gap-3 text-xs">
                                    <span className="text-green-400">{oppWins}W</span>
                                    <span className="text-amber-400">{oppDraws}D</span>
                                    <span className="text-red-400">{oppLosses}L</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Match list */}
                <div className="flex flex-col gap-3">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">Match History</p>

                    {deckMatches.length === 0 ? (
                        <p className="text-zinc-500 text-sm text-center py-4">No matches yet</p>
                    ) : (
                        deckMatches.map(match => {
                            const opponent = decks.find(d => d.id === match.opponentDeckId);
                            return (
                                <div key={match.id} className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white text-sm">{opponent?.name ?? 'Unknown'}</span>
                                        <span className="text-white font-bold">{match.result}</span>
                                    </div>
                                    <div className="flex gap-3 text-xs text-zinc-500">
                                        <span>{match.eventType}</span>
                                        <span>{match.onThePlay ? 'On the Play' : 'On the Draw'}</span>
                                        {match.mulligan && <span>Mulligan to {match.mulliganTo}</span>}
                                        <span>{new Date(match.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </>
    )


}

export default StatsDeck