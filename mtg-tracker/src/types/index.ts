// src/types/index.ts

export type Format = 'Standard' | 'Modern' | 'Legacy' | 'Vintage' | 'Pauper' | 'Commander' | 'Draft'

export type Color = 'W' | 'U' | 'B' | 'R' | 'G'

export type Archetype = 'Aggro' | 'Control' | 'Combo' | 'Midrange' | 'Tempo' | 'Ramp'

export type MatchResult = '2-0' | '2-1' | '1-1' | '1-2' | '0-2'

export type EventType = 'MTGO Game' | 'In-Person Game'

export type MulliganTo = 6 | 5 | 4 | 3

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
    eventType: EventType
    onThePlay: boolean
    result: MatchResult
    mulligan: boolean
    mulliganTo: MulliganTo | null
    date: string
}