import React from 'react'
import {format} from 'date-fns';
import { IMAGE_BASE_URL } from '../services/constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/favoriteSlice';


const MovieCard = (props) => {
    const dateformat = "dd MMM yyyy";
    
    const {data} = props;

    const dispatch = useDispatch();

    const handleFavorite = () => {
      dispatch(toggleFavorite(data));
    }

    const isFavorite = useSelector(
      (state) => state.favorite.movies.some((m) => m.id === data.id)
    );

    
  return (
    <div className='relative m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200'>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            e.preventDefault(); // Prevent Link navigation
            handleFavorite();
          }}
          className='absolute top-0.5 right-2 text-2xl'
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <img src={IMAGE_BASE_URL + data?.poster_path} alt="poster-img" className="rounded-lg"/>
        <div>
            <h1 className='font-bold'>{data?.title}</h1>
            <p className='font-bold'>{data?.release_date ? format(new Date(data?.release_date),dateformat) : "Unknown"}</p>
        </div>
    </div>
  );
};

export default MovieCard;