import React, { useState } from 'react';

const SearchBar = ({ search }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        search(searchTerm);
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    );
}

export default SearchBar;