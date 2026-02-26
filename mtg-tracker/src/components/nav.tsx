import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="fixed bottom-0 w-full flex justify-around bg-zinc-900 py-3">            <Link to="/decks">Decks</Link>
            <Link to="/life-tracker">Life Tracker</Link>
            <Link to="/new-match">New Match</Link>
            <Link to="/stats">Stats</Link>
        </nav>
    )
}