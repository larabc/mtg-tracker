import type { Deck, Match } from "../types";

const DECKS: Deck[] = [
    {
        id: "deck-azorius",
        name: "Azorius Control",
        format: "Modern",
        colors: ["W", "U"],
        archetype: "Control",
        comments: "",
        archived: false,
        createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
        id: "deck-mono-red",
        name: "Mono Red Burn",
        format: "Modern",
        colors: ["R"],
        archetype: "Aggro",
        comments: "",
        archived: false,
        createdAt: "2024-01-02T00:00:00.000Z"
    },
    {
        id: "deck-jund",
        name: "Jund Midrange",
        format: "Modern",
        colors: ["B", "R", "G"],
        archetype: "Midrange",
        comments: "",
        archived: false,
        createdAt: "2024-01-03T00:00:00.000Z"
    },
    {
        id: "deck-izzet",
        name: "Izzet Phoenix",
        format: "Modern",
        colors: ["U", "R"],
        archetype: "Combo",
        comments: "",
        archived: false,
        createdAt: "2024-01-04T00:00:00.000Z"
    }
];

const MATCHES: Match[] = [
    // Azorius Control vs Izzet Phoenix (2W 1L)
    {
        id: "match-1",
        deckId: "deck-azorius",
        opponentDeckId: "deck-izzet",
        eventType: "MTGO Game",
        onThePlay: true,
        result: "2-0",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-01T18:00:00.000Z"
    },
    {
        id: "match-2",
        deckId: "deck-azorius",
        opponentDeckId: "deck-izzet",
        eventType: "MTGO Game",
        onThePlay: false,
        result: "1-2",
        mulligan: true,
        mulliganTo: 6,
        date: "2024-02-03T18:00:00.000Z"
    },
    {
        id: "match-3",
        deckId: "deck-azorius",
        opponentDeckId: "deck-izzet",
        eventType: "In-Person Game",
        onThePlay: true,
        result: "2-1",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-10T18:00:00.000Z"
    },
    // Azorius Control vs Mono Red Burn (2W)
    {
        id: "match-4",
        deckId: "deck-azorius",
        opponentDeckId: "deck-mono-red",
        eventType: "MTGO Game",
        onThePlay: true,
        result: "2-0",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-05T18:00:00.000Z"
    },
    {
        id: "match-5",
        deckId: "deck-azorius",
        opponentDeckId: "deck-mono-red",
        eventType: "MTGO Game",
        onThePlay: false,
        result: "2-1",
        mulligan: true,
        mulliganTo: 6,
        date: "2024-02-07T18:00:00.000Z"
    },
    // Mono Red Burn vs Izzet Phoenix (1W 1L)
    {
        id: "match-6",
        deckId: "deck-mono-red",
        opponentDeckId: "deck-izzet",
        eventType: "MTGO Game",
        onThePlay: true,
        result: "2-0",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-08T18:00:00.000Z"
    },
    {
        id: "match-7",
        deckId: "deck-mono-red",
        opponentDeckId: "deck-izzet",
        eventType: "MTGO Game",
        onThePlay: false,
        result: "0-2",
        mulligan: true,
        mulliganTo: 5,
        date: "2024-02-09T18:00:00.000Z"
    },
    // Jund Midrange vs Izzet Phoenix (1W)
    {
        id: "match-8",
        deckId: "deck-jund",
        opponentDeckId: "deck-izzet",
        eventType: "In-Person Game",
        onThePlay: true,
        result: "2-1",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-12T18:00:00.000Z"
    },
    // Jund Midrange vs Azorius Control (1D)
    {
        id: "match-9",
        deckId: "deck-jund",
        opponentDeckId: "deck-azorius",
        eventType: "In-Person Game",
        onThePlay: false,
        result: "1-1",
        mulligan: false,
        mulliganTo: null,
        date: "2024-02-14T18:00:00.000Z"
    }
];

export function seedMockData() {
    localStorage.setItem("decks", JSON.stringify(DECKS));
    localStorage.setItem("matches", JSON.stringify(MATCHES));
    console.log("Mock data seeded. Refresh the page.");
}

export function clearMockData() {
    localStorage.removeItem("decks");
    localStorage.removeItem("matches");
    console.log("Data cleared. Refresh the page.");
}
