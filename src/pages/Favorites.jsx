import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import MovieCard from "../components/MovieCard";

const Favorites = () => {

    const movies = useSelector((store) => store.favorite.movies);

    return (
        <div>
            <div className='flex flex-wrap mx-12'>
                {movies.map((movie) => (
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
};

export default Favorites;