import React, { useState } from "react"


export function SearchBar({ onSearchSubmit }) {
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(search);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search music..." value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}