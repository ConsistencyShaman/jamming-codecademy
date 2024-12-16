import { NavLink, isActive } from "react-router-dom";

// Whenever a navlink is active has a .active class for easy CSS styling
// navBar.active { color: red }

export function Nav() {

    return (
        <nav className="navBar">
            <NavLink to='/user/profile' end>Profile</NavLink>
            <NavLink to='/user/playlist' end>Playlists</NavLink>
            <NavLink to='/user/tracklist' end>All My Music</NavLink>

        </nav>
    )
}