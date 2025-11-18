import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MOVIE_BASE_URL, MOVIE_PAGE_IMAGE_URL } from "../services/constants";
import CastCard from "../components/CastCard";
import { Link } from "react-router";

const MovieDetails = () => {

    const apiAccessToken = process.env.PARCEL_API_ACCESS_TOKEN;


    const [movieDetails, setMovieDetails] = useState([]);
    const [castDetails, setCastDetails] = useState([]);
    const [genre, setGenre] = useState([]);

    const {movieid} = useParams();

    useEffect(() => {
        fetchMovieDetails();
        fetchCast();
    }, []);

    const fetchMovieDetails = async () => {
        const data = await fetch(`${MOVIE_BASE_URL}/${movieid}?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });
        const json = await data.json();

        setMovieDetails(json);
        setGenre(json?.genres);


    } 

    const fetchCast = async () => {
        const data = await fetch(`${MOVIE_BASE_URL}/${movieid}/credits?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });
        const json = await data.json();
        setCastDetails(json?.cast);
    }


    return (
        <div>
            <div className="flex m-6 justify-center">
                <img src={MOVIE_PAGE_IMAGE_URL + movieDetails.poster_path} alt="poster_img" className="w-48 h-70" />
                <div className="mx-4">
                    <h1 className="font-bold text-2xl">{movieDetails.title} ({movieDetails.release_date?.slice(0,4)})</h1>
                    <ul className="flex space-x-2 text-gray-500 mb-4">
                        {genre.map((item,index) => (
                            <li key={index}>
                                {index === genre.length-1 ? (
                                    <span>{item.name}</span>
                                ) : (
                                    <span>{item.name},</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <i className="text-gray-600 my-4 block">{movieDetails?.tagline}</i>
                    <h1 className="font-bold">Overview:</h1>
                    <p className="text-justify">{movieDetails?.overview}</p>
                </div>
            </div>
            <div className="ml-6">
               <h1 className="font-bold">Top Cast:</h1>
               <div className="flex flex-wrap">
                
                    {castDetails.slice(0,10).map((cast) => (
                        <Link to={"/actor/" + cast?.id} key={cast?.cast_id}>
                        <CastCard key={cast?.cast_id} data={cast}/>
                        </Link> 
                    ))} 
                 
                </div>         
            </div>
        </div>
    );
};

export default MovieDetails;