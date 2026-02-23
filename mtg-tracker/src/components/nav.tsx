import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <Link to="/decks">Decks</Link>
            <Link to="/life-tracker">Life Tracker</Link>
            <Link to="/new-match">New Match</Link>
            <Link to="/stats">Stats</Link>
        </>
    )
}