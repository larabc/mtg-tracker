
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


    function saveMatch(props: NewMatch) {
        const newMatch = { ...props, id: uuidv4(), date: new Date().toISOString() }
        setMatches([...matches, newMatch]);
    }

    function updateMatch(props: Match) {
        const matchId = props.id;
        const updatedMatches = matches.map(match => {
            if (match.id === matchId) {
                return props
            }
            return match;
        })

        setMatches(updatedMatches);
    }

    function deleteMatch(props: Match) {
        setMatches(matches.filter(match => match.id !== props.id));
    }

    return { matches, saveMatch, updateMatch, deleteMatch };
}

export default useMatches; 