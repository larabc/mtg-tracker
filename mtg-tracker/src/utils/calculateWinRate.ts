import type { Match } from "../types"
import { MATCH_RESULTS } from "./matchResult"

export function calculateWinRate(matches: Match[]): number {
    if (matches.length === 0) return 0

    const wins = matches.filter(m => m.result === MATCH_RESULTS[0] || m.result === MATCH_RESULTS[1]).length

    return (wins / matches.length) * 100
}