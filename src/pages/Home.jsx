import React, { useEffect, useState } from 'react';
import { BASE_URL, SEARCH_URL } from '../services/constants';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router';
import Search from '../components/Search';

const Home = () => {

    const apiAccessToken = process.env.PARCEL_API_ACCESS_TOKEN;

    // List of Trending Movies
    const [listOfMovies,setListOfMovies] = useState([]);
    // Search
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(`${BASE_URL}/trending/movie/day?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });

        const json = await data.json();
         
        setListOfMovies(json?.results);
    }

    // Search Function
    const searchMovies = async (query) => {
        setIsSearching(true);

        const data = await fetch(`${SEARCH_URL}${query}&include_adult=false&language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });

        const json = await data.json();
        setSearchResults(json?.results);
    };

    const moviesToShow = isSearching ? searchResults : listOfMovies;

  return (
    <div>
        <div>
            <Search onSearch={searchMovies}/>
        </div>
        <div className='flex flex-wrap mx-12'>
            {moviesToShow.map((movie) => (
                <Link
                    key={movie?.id}
                    to={"/movie/" + movie?.id}
                    >
                    <MovieCard key={movie?.id} data = {movie} />
                </Link>
            ))}
        
        </div>
        
    </div>
  )
}

export default Home;