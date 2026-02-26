import useMatches from "../hooks/useMatches"
import Header from "../components/Header";
import useDecks from "../hooks/useDecks";
import { type EventType, type MatchResult, type MulliganTo, type NewMatch } from "../types";
import { useState } from "react";
import { MULLIGAN_OPTIONS } from "../utils/mulliganOptions";
import { MATCH_RESULTS } from "../utils/matchResult";
import { useNavigate } from "react-router-dom";

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
            <button onClick={handleMatchCreation}>Save</button>
            <label htmlFor="deck-select"></label>
            <select name="deckId" id="deck-select" value={matchData.deckId} onChange={handleInputChange}>
                <option value="">Select a deck</option>
                {decks.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                ))}
            </select>
            {errors.deckId && <span>{errors.deckId}</span>}
            <select name="opponentDeckId" id="opponent-deck-select" value={matchData.opponentDeckId} onChange={handleInputChange}>
                <option value="">Select a deck</option>
                {decks.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                ))}
            </select>
            {errors.opponentDeckId && <span>{errors.opponentDeckId}</span>}
            <fieldset>
                <legend>Event Type</legend>
                <input type="radio" name="eventType" value="MTGO Game" id="mtgo" onChange={handleInputChange} />
                <label htmlFor="mtgo">MTGO Game</label>
                <input type="radio" name="eventType" value="In-Person Game" id="in-person" onChange={handleInputChange} />
                <label htmlFor="in-person">In-Person Game</label>
                {errors.eventType && <span>{errors.eventType}</span>}

            </fieldset>
            <input type="checkbox" id="on-the-play" name="onThePlay" onChange={handleCheckboxChange} />
            <label htmlFor="on-the-play">On the Play</label>
            <input type="checkbox" id="mulligan" name="mulligan" onChange={handleCheckboxChange} />
            <label htmlFor="mulligan">Mulliganed</label>
            {matchData.mulligan && (
                <>
                    <span>Mulligan to</span>
                    <select name="mulliganTo" id="mulligan-select" onChange={handleInputChange}>
                        {MULLIGAN_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </>
            )}
            {/* Show initial date in the input */}
            <input type="datetime-local" value={matchData.date} name="date" onChange={handleInputChange} />

            {/* Create Match Results Section */}
            <label htmlFor="match-result">Match Results</label>
            {
                MATCH_RESULTS.map(result => (
                    <button key={result} value={result} className={matchData.result === result ? 'selected' : ''} onClick={() => handleResultSelect(result)}>{result}</button>
                ))
            }
            {errors.result && <span>{errors.result}</span>}

        </>
    );
}