import useDecks from "../hooks/useDecks";
import useMatches from "../hooks/useMatches";
import { calculateWinRate } from "../utils/calculateWinRate";
import { COLOR_MAP } from "../utils/colorMap";
import Header from "../components/Header";
import type { Match } from "../types";

function getRecord(matches: Match[]) {
    const wins = matches.filter(m => m.result === '2-0' || m.result === '2-1').length;
    const draws = matches.filter(m => m.result === '1-1').length;
    const losses = matches.filter(m => m.result === '1-2' || m.result === '0-2').length;
    return { wins, draws, losses };
}

function winRateColor(rate: number, total: number) {
    if (total === 0) return 'text-zinc-500';
    if (rate >= 60) return 'text-green-400';
    if (rate >= 50) return 'text-amber-400';
    return 'text-red-400';
}

function winRateBarColor(rate: number, total: number) {
    if (total === 0) return 'bg-zinc-700';
    if (rate >= 60) return 'bg-green-500';
    if (rate >= 50) return 'bg-amber-400';
    return 'bg-red-500';
}

export default function Stats() {

    const { matches } = useMatches();
    const { decks } = useDecks();

    const overallWinRate = calculateWinRate(matches);
    const { wins: totalWins, draws: totalDraws, losses: totalLosses } = getRecord(matches);

    return (
        <>
            <Header title="Stats" />

            <div className="flex flex-col gap-4 px-4 pt-4 pb-8">

                {/* Summary card */}
                <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Overall</p>
                    <div className="flex items-end justify-between mb-3">
                        <span className={`text-4xl font-bold ${winRateColor(overallWinRate, matches.length)}`}>
                            {matches.length === 0 ? '—' : `${overallWinRate.toFixed(0)}%`}
                        </span>
                        <span className="text-zinc-500 text-sm">{matches.length} matches</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${winRateBarColor(overallWinRate, matches.length)}`}
                            style={{ width: `${overallWinRate}%` }}
                        />
                    </div>
                    <div className="flex gap-4 mt-3 text-sm">
                        <span className="text-green-400">{totalWins}W</span>
                        <span className="text-amber-400">{totalDraws}D</span>
                        <span className="text-red-400">{totalLosses}L</span>
                    </div>
                </div>

                {/* Per-deck breakdown */}
                {decks.length === 0 ? (
                    <p className="text-zinc-500 text-sm text-center py-8">No decks yet</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        <p className="text-zinc-400 text-xs uppercase tracking-widest">By Deck</p>
                        {decks.map(deck => {
                            const deckMatches = matches.filter(m => m.deckId === deck.id);
                            const winRate = calculateWinRate(deckMatches);
                            const { wins, draws, losses } = getRecord(deckMatches);
                            const total = deckMatches.length;

                            return (
                                <div key={deck.id} className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-1">
                                                {deck.colors.map(color => (
                                                    <span key={color} className={`inline-block w-3 h-3 rounded-full ${COLOR_MAP[color]}`} />
                                                ))}
                                            </div>
                                            <span className="text-white font-semibold text-sm">{deck.name}</span>
                                        </div>
                                        <span className="text-zinc-600 text-xs">{deck.format}</span>
                                    </div>

                                    <div className="flex items-end justify-between mb-2">
                                        <span className={`text-2xl font-bold ${winRateColor(winRate, total)}`}>
                                            {total === 0 ? '—' : `${winRate.toFixed(0)}%`}
                                        </span>
                                        <span className="text-zinc-500 text-xs">{total} matches</span>
                                    </div>

                                    <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden mb-3">
                                        <div
                                            className={`h-full rounded-full ${winRateBarColor(winRate, total)}`}
                                            style={{ width: `${winRate}%` }}
                                        />
                                    </div>

                                    <div className="flex gap-3 text-xs">
                                        <span className="text-green-400">{wins}W</span>
                                        <span className="text-amber-400">{draws}D</span>
                                        <span className="text-red-400">{losses}L</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
