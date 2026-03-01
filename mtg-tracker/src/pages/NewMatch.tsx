import useMatches from "../hooks/useMatches"
import Header from "../components/Header";
import useDecks from "../hooks/useDecks";
import { type EventType, type MatchResult, type MulliganTo, type NewMatch } from "../types";
import { useState } from "react";
import { MULLIGAN_OPTIONS } from "../utils/mulliganOptions";
import { MATCH_RESULTS } from "../utils/matchResult";
import { useNavigate } from "react-router-dom";

const RESULT_STYLE: Record<string, { base: string; selected: string }> = {
    '2-0': { base: 'border-zinc-700 text-zinc-300', selected: 'border-green-500 bg-green-500/20 text-green-400' },
    '2-1': { base: 'border-zinc-700 text-zinc-300', selected: 'border-green-500 bg-green-500/20 text-green-400' },
    '1-1': { base: 'border-zinc-700 text-zinc-300', selected: 'border-amber-400 bg-amber-400/20 text-amber-400' },
    '1-2': { base: 'border-zinc-700 text-zinc-300', selected: 'border-red-500 bg-red-500/20 text-red-400' },
    '0-2': { base: 'border-zinc-700 text-zinc-300', selected: 'border-red-500 bg-red-500/20 text-red-400' },
}

const inputClass = "w-full bg-zinc-800 text-white rounded-lg px-3 py-2 outline-none border border-zinc-700 focus:border-amber-400";
const labelClass = "text-zinc-400 text-sm";
const errorClass = "text-red-400 text-xs mt-1";

export default function NewMatch() {

    const { createMatch } = useMatches();
    const { decks } = useDecks();
    const navigate = useNavigate();

    const [matchData, setMatchData] = useState<NewMatch>({
        deckId: '',
        opponentDeckId: '',
        eventType: '' as EventType,
        onThePlay: false,
        result: '' as MatchResult,
        mulligan: false,
        mulliganTo: null,
        date: new Date().toISOString().slice(0, 16)
    })

    const [errors, setErrors] = useState<{ deckId?: string, opponentDeckId?: string, eventType?: string, result?: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: undefined })
        }

        if (name === 'mulliganTo') {
            setMatchData({ ...matchData, mulliganTo: Number(value) as MulliganTo })
            return
        }
        setMatchData({ ...matchData, [name]: value })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchData({ ...matchData, [e.target.name]: e.target.checked })
    }

    const handleResultSelect = (result: MatchResult) => {
        if (errors.result) setErrors({ ...errors, result: undefined })
        setMatchData({ ...matchData, result })
    }

    const handleMatchCreation = () => {

        const newErrors: { deckId?: string, opponentDeckId?: string, eventType?: string, result?: string } = {}

        if (!matchData.deckId) newErrors.deckId = 'Select a deck';
        if (!matchData.opponentDeckId) newErrors.opponentDeckId = 'Select a deck';
        if (!matchData.eventType) newErrors.eventType = 'Select an event type';
        if (!matchData.result) newErrors.result = 'Select a result';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        createMatch(matchData);
        navigate('/decks');
    }

    return (
        <>
            <Header title="Record Match" />

            <div className="flex flex-col gap-6 px-4 pb-28 pt-4">

                {/* My Deck */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="deck-select" className={labelClass}>My Deck</label>
                    <select
                        name="deckId"
                        id="deck-select"
                        value={matchData.deckId}
                        onChange={handleInputChange}
                        className={`${inputClass} ${errors.deckId ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select a deck</option>
                        {decks.map(deck => (
                            <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                        ))}
                    </select>
                    {errors.deckId && <span className={errorClass}>{errors.deckId}</span>}
                </div>

                {/* Opponent's Deck */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="opponent-deck-select" className={labelClass}>Opponent's Deck</label>
                    <select
                        name="opponentDeckId"
                        id="opponent-deck-select"
                        value={matchData.opponentDeckId}
                        onChange={handleInputChange}
                        className={`${inputClass} ${errors.opponentDeckId ? 'border-red-500' : ''}`}
                    >
                        <option value="">Select a deck</option>
                        {decks.map(deck => (
                            <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                        ))}
                    </select>
                    {errors.opponentDeckId && <span className={errorClass}>{errors.opponentDeckId}</span>}
                </div>

                {/* Event Type */}
                <div className="flex flex-col gap-2">
                    <span className={labelClass}>Event Type</span>
                    <div className="flex gap-2">
                        {(['MTGO Game', 'In-Person Game'] as EventType[]).map(type => (
                            <label
                                key={type}
                                className={`flex-1 text-center py-2 rounded-lg border cursor-pointer text-sm font-medium transition-colors ${
                                    matchData.eventType === type
                                        ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                                        : 'border-zinc-700 text-zinc-300 bg-zinc-800'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="eventType"
                                    value={type}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                    {errors.eventType && <span className={errorClass}>{errors.eventType}</span>}
                </div>

                {/* Match Result */}
                <div className="flex flex-col gap-2">
                    <span className={labelClass}>Match Result</span>
                    <div className="flex gap-2">
                        {MATCH_RESULTS.map(result => {
                            const style = RESULT_STYLE[result];
                            const isSelected = matchData.result === result;
                            return (
                                <button
                                    key={result}
                                    onClick={() => handleResultSelect(result)}
                                    className={`flex-1 py-3 rounded-lg border font-bold text-sm transition-colors ${
                                        isSelected ? style.selected : `${style.base} bg-zinc-800`
                                    }`}
                                >
                                    {result}
                                </button>
                            );
                        })}
                    </div>
                    {errors.result && <span className={errorClass}>{errors.result}</span>}
                </div>

                {/* Toggles */}
                <div className="flex flex-col gap-4">

                    {/* On the Play */}
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-white text-sm">On the Play</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="onThePlay"
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-zinc-700 rounded-full peer-checked:bg-amber-400 transition-colors" />
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                        </div>
                    </label>

                    {/* Mulligan */}
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-white text-sm">Mulliganed</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="mulligan"
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-zinc-700 rounded-full peer-checked:bg-amber-400 transition-colors" />
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                        </div>
                    </label>

                    {/* Mulligan To */}
                    {matchData.mulligan && (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="mulligan-select" className={labelClass}>Mulligan To</label>
                            <select
                                name="mulliganTo"
                                id="mulligan-select"
                                onChange={handleInputChange}
                                className={inputClass}
                            >
                                {MULLIGAN_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option} cards</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="date" className={labelClass}>Date & Time</label>
                    <input
                        type="datetime-local"
                        id="date"
                        value={matchData.date}
                        name="date"
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </div>

            </div>

            {/* Fixed Save Button */}
            <div className="fixed bottom-20 left-0 right-0 px-4">
                <button
                    onClick={handleMatchCreation}
                    className="w-full py-3 rounded-xl bg-amber-400 text-zinc-950 font-bold text-base"
                >
                    Save Match
                </button>
            </div>
        </>
    );
}
