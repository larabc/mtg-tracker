import useMatches from "../hooks/useMatches"
import Header from "../components/Header";
import useDecks from "../hooks/useDecks";
import { type EventType, type MatchResult, type MulliganTo, type NewMatch } from "../types";
import { useState } from "react";
import { MULLIGAN_OPTIONS } from "../utils/mulliganOptions";
import { MATCH_RESULTS } from "../utils/matchResult";

export default function NewMatch() {

    const { createMatch } = useMatches();
    const { decks } = useDecks();

    const [matchData, setMatchData] = useState<NewMatch>({
        deckId: '',
        eventType: '' as EventType,
        onThePlay: false,
        result: '' as MatchResult,
        mulligan: false,
        mulliganTo: null,
        date: new Date().toISOString().slice(0, 16)
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'mulliganTo') {
            setMatchData({ ...matchData, mulliganTo: Number(e.target.value) as MulliganTo })
            return
        }
        setMatchData({ ...matchData, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchData({ ...matchData, [e.target.name]: e.target.checked })
    }

    const handleResultSelect = (result: MatchResult) => {
        setMatchData({ ...matchData, result })
    }

    const handleMatchCreation = () => {
        createMatch(matchData);
    }

    return (
        <>
            <Header title="Record Match" />
            <button onClick={handleMatchCreation}>Save</button>
            <label htmlFor="deck-select"></label>
            <select name="deckId" id="deck-select" onChange={handleInputChange}>
                {decks.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                ))}
            </select>
            <fieldset>
                <legend>Event Type</legend>
                <input type="radio" name="eventType" value="MTGO Game" onChange={handleInputChange} />
                <input type="radio" name="eventType" value="In-Person Game" onChange={handleInputChange} />
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
        </>
    );
}