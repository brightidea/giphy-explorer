import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/GifSearch.module.css';
import PaginationPill from './paginationPill';

const GifSearch = () => {
  // the current value of the input
  const [searchTerm, setSearchTerm] = useState('');
  // the current search term of the displayed results
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  // are more gifs being fetched from the API?
  const [isFetching, setIsFetching] = useState('');
  // The array of gifs to display
  const [gifs, setGifs] = useState([]);
  // The array of gifs to display
  const [gifPagination, setGifPagination] = useState({});

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formSubmitHandler = (e) => {
    // stop form from submitting and refreshing page
    e.preventDefault();
    // Show loading icon and trigger fetchGifs() via useEffect below
    setIsFetching(true);
  }

  // Hit fetch api when user scrolls to the end of the page
  const handleScroll = (e) => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Call fetchGifs when setIsFetching(true)
  useEffect(() => {
    if (!isFetching) return;
    fetchGifs();
  }, [isFetching]);

  const fetchGifs = async () => {
    // Get length of gifs array to pass as offset in api call
    let currentGifCount = (searchTerm === currentSearchTerm) && (gifs && gifs.length > 0) ? gifs.length : 0;
    try {
      // Call the Giphy API
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", { 
        params: {
          api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
          q: searchTerm,
          limit: 20,
          offset: currentGifCount,
        }
      });
      // If the search term hasnt changed append results to current array
      if (searchTerm === currentSearchTerm){
        setGifs(oldValues => {
          return [ ...oldValues, ...response.data.data];
        });
        // Get pagination values from api response so we can display totals & current count
        setGifPagination(response.data.pagination);
      } else {
        // If new search term replace array gifs with new results
        setGifs([...response.data.data]);
        // Get pagination values from api response so we can display totals & current count
        setGifPagination(response.data.pagination);
        // update currentSearchTerm with new value
        setCurrentSearchTerm(searchTerm);
        // scroll user to the top for new search terms
        document.querySelector('#root').scrollIntoView({
            behavior: 'smooth'
        }, 500)
      }
      // Remove loading icon after api call completes
      setIsFetching(false);
    } catch(err){
      console.error(err)
      // Remove loading icon after api call errors
      setIsFetching(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={formSubmitHandler} className={styles.form}>
          <div className="absolute top-4 left-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
          </div>
          <input 
            type="text" 
            className={styles.input}
            placeholder="Search For An Awesome Gif..."
            value={searchTerm}
            onChange={handleChange} />
          <div className="absolute top-2 right-2">
            <button 
              disabled={isFetching}
              type="submit"
              value="submit"
              className={styles.searchButton}>Search</button> 
          </div>
        </form>
      </div>

      {gifPagination.total_count > 0 ? <PaginationPill pagination={gifPagination} /> : null }

      <div className={styles.gifGrid}>
        {gifs.map((gif, index) => (
            <img src={gif.images.downsized.url} key={index} className={styles.gif} />
        ))}
      </div>
      
      { isFetching ? <Image src="/spinner.svg" alt="loading Spinner" width={80} height={80} /> : null }
    </>
  );
}

export default GifSearch;
