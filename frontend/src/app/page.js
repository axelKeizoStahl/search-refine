"use client"
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
      if (searchResults.data) {
        setSearchResponses(searchResults.data);
      } else {
        setSearchResponses("Sorry, due to a lack of resources the sites with the information are not available right now, you may try again");
      }
      setSearchedText(searchResults.query);
      setQuery('');
    } catch (err) {
      console.error(`[ERR] ${err}`);
    }
  };
  return (
    <div className='home'>
      <div className='header'>
        <h1>Search Refine</h1>
        <h2>The first search engine <i>polished</i> by AI.</h2>
        <p>Search Refine uses ai to refine your search so that you can get the results you want from a search engine. You can input a question, or even a vague description as the ai will translate it into something search engines can proccess better.</p>
      </div>
      <div className='search'>
        <form onSubmit={handleSearch}>
          <input className='searchbar' type='text' placeholder={query ? 'Type Here: ' : searchedText} value={query} onChange={handleChange} />
          <input className='submit' type='submit' />
        </form>
      </div>
      <div className="links">
        {searchResponses.length === 0 ? (
          <div></div>
        ) : typeof searchResponses === "object" ? (
          searchResponses.map((response, index) => (
            <div className='text'>
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
            </div>
          ))
        ) : (
          <h4>{"Sorry, due to a lack of resources the sites with the information are not available right now, you may try again"}</h4> 
        )}
      </div>
    </div>
  );
}

