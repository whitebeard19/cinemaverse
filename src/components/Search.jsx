import React, { useState } from 'react'

const Search = ({onSearch}) => {

    const[query, setQuery] = useState("");

    const handleSearch = () => {
        if(query.trim() === "") return;
        onSearch(query);
    };

  return (
    <div>
        <div className='flex justify-end mx-8 my-4'>
            <input type="text"
                placeholder='Search Movies...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='mx-4 px-4 py-2 rounded-lg bg-white border border-y-gray-600 focu:outline-none'
            />
            <button
                className='mr-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2 font-bold'
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    </div>
  )
}

export default Search