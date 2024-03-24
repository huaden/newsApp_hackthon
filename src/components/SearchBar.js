import React, { useState } from 'react';
import './components.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); // Call the onSearch function with the current searchTerm
    }

    return (
        <form onSubmit={handleSubmit}> {/* Add onSubmit handler to the form */}
            <input
                type='text'
                placeholder='Find news...'
                value={searchTerm}
                onChange={handleSearch}
                className='search'
            />
        </form>
    );
}

export default SearchBar;