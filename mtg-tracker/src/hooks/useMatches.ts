
import { useEffect, useState } from "react";
import type { Match, NewMatch } from "../types"
import { v4 as uuidv4 } from 'uuid'

const useMatches = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const matchesHistory = localStorage.getItem('matches');
        if (matchesHistory) {
            setMatches(JSON.parse(matchesHistory));
        }

    }, [])

    useEffect(() => {
        if (matches.length > 0) {
            localStorage.setItem('matches', JSON.stringify(matches))
        }
    }, [matches])


    function createMatch(match: NewMatch) {
        const newMatch = { ...match, id: uuidv4() }
        setMatches([...matches, newMatch]);
    }

    function updateMatch(match: Match) {
        const updatedMatches = matches.map(existing => {
            if (existing.id === match.id) {
                return match
            }
            return existing;
        })

        setMatches(updatedMatches);
    }

    function deleteMatch(match: Match) {
        setMatches(matches.filter(existing => existing.id !== match.id));
    }

    return { matches, createMatch, updateMatch, deleteMatch };
}

export default useMatches; 