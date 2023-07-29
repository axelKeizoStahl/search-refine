"use client"
import styles from './page.module.css';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchedText, setSearchedText] = useState('');
  const [searchResponses, setSearchResponses] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/searchGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: query })
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const searchResults = await response.json();
      console.log(searchResults);
      setSearchResponses(searchResults.data);
      setSearchedText(searchResults.query);
      setQuery('');
    } catch (err) {
      console.error(`[ERR] ${err}`);
    }
  };
  return (
    <div>
      <div className='header'>
        <h1>Search Refine</h1>
        <form onSubmit={handleSearch}>
          <label>
            <input type='text' placeholder={query ? 'Type Here: ' : searchedText} value={query} onChange={handleChange} />
          </label>
          <input type='submit' value='Search' />
        </form>
      </div>
      <div className="links">
        {!searchResponses || searchResponses.length === 0 ? (
          <div></div>
        ) : (
          searchResponses.map((response, index) => (
            <div className='responses' key={`response${index}`}>
              <a href={response.link}>
                <h4>{response.title}</h4>
              </a>
              <div className='snippet'>
                {response.snippet}
              </div>
              <a href={response.link}>
                <small>{response.link}</small>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

