import useMatches from "../hooks/useMatches"
import Header from "../components/Header";
import useDecks from "../hooks/useDecks";
import { newMatch, type EventType, type MatchResult } from "../types";
import { useState } from "react";
import { MULLIGAN_OPTIONS } from "../utils/mulliganOptions";

export default function NewMatch() {

    const { matches, saveMatch } = useMatches();
    const { decks } = useDecks();

    const [matchData, setMatchData] = useState<newMatch>({
        deckId: '',
        eventType: '' as EventType,
        onThePlay: false,
        result: '' as MatchResult,
        mulligan: false,
        mulliganTo: null,
        date: new Date().toISOString().slice(0, 16)
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setMatchData({ ...matchData, [e.target.name]: e.target.value })
    }

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchData({ ...matchData, [e.target.name]: e.target.checked })
    }

    return (
        <>
            <Header title="Record Match" />
            <button>Save</button>
            <label htmlFor="select-deck"></label>
            <select name="select-decks" id="deck-select" onChange={handleInputChange}>
                {decks.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.name} ({deck.format})</option>
                ))}
            </select>
            <fieldset>
                <legend>Event Type</legend>
                <input type="radio" name="eventType" value="MTGO Game" onChange={handleInputChange} />
                <input type="radio" name="eventType" value="In-Person Game" onChange={handleInputChange} />
            </fieldset>
            <input type="checkbox" id="on-the-play" name="onThePlay" onChange={handleCheckBoxChange} />
            <label htmlFor="on-the-play">On the Play</label>
            <input type="checkbox" id="mulligan" name="mulligan" onChange={handleCheckBoxChange} />
            <label htmlFor="mulligained">Mulligained</label>
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

        </>
    );
}