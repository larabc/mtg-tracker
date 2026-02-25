// src/types/index.ts

import { MATCH_RESULTS } from "../utils/matchResult"
import type { MULLIGAN_OPTIONS } from "../utils/mulliganOptions"
import { FORMATS } from "../utils/formats"
import { COLORS } from "../utils/colors"
import { ARCHETYPES } from "../utils/archetypes"

export type Format = typeof FORMATS[number]

export type Color = typeof COLORS[number]

export type Archetype = typeof ARCHETYPES[number]

export type MatchResult = typeof MATCH_RESULTS[number]

export type EventType = 'MTGO Game' | 'In-Person Game'

export type MulliganTo = typeof MULLIGAN_OPTIONS[number]

export type NewDeck = Omit<Deck, "id" | "createdAt">

export type NewMatch = Omit<Match, "id">

export interface Deck {
    id: string
    name: string
    format: Format
    colors: Color[]
    archetype: Archetype
    comments: string
    archived: boolean
    createdAt: string
}

export interface Match {
    id: string
    deckId: string
    opponentDeckId: string
    eventType: EventType
    onThePlay: boolean
    result: MatchResult
    mulligan: boolean
    mulliganTo: MulliganTo | null
    date: string
}