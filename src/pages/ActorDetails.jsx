import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ACTOR_BASE_URL, IMAGE_BASE_URL, MOVIE_PAGE_IMAGE_URL } from '../services/constants';

const ActorDetails = () => {

    const apiAccessToken = process.env.PARCEL_API_ACCESS_TOKEN;


    const {actorid} = useParams();

    const [actor, setActor] = useState([]);
    const [moviesActed, setMoviesActed] = useState([]);

    useEffect(() => {
        fetchActorDetails();
        fetchActedMovies();
    }, []);

    const fetchActorDetails = async () => {
        const data = await fetch(`${ACTOR_BASE_URL}/${actorid}?language=en-US` , {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });

        const json = await data.json();
        setActor(json);

        
    };

    const fetchActedMovies = async () => {
        const data = await fetch(`${ACTOR_BASE_URL}/${actorid}/combined_credits?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiAccessToken}`,
            }
        });

        const json = await data.json();
        setMoviesActed(json?.cast);

    }


  return (
    <div>
        <div>
            <div className='flex m-4'>
                <img src={MOVIE_PAGE_IMAGE_URL + actor?.profile_path} alt="actor_img" className='w-58 h-84 m-8 rounded-lg'/>
                <div>
                    <h1 className='mt-8 font-bold text-2xl'>{actor?.name}</h1>
                    <h1 className='my-4 font-bold text-lg'>Biography</h1>
                    <p className='text-sm text-justify mr-16'>{actor?.biography}</p>
                </div>
            </div>
            <div className='flex m-4'>
                <div className='mx-8 my-4'>
                    <p className='mx-8 font-bold text-lg'>Personal Info</p>
                    <ul className='ml-8'>
                        <li className='mt-3 font-bold'>Known For</li>
                        <li>{actor?.known_for_department}</li>
                        <li className='mt-3 font-bold'>Gender</li>
                        <li>{actor?.gender == 2 ? "Male" : "Female"}</li>
                        <li className='mt-3 font-bold'>Birthdate</li>
                        <li>{actor?.birthday}</li>
                        <li className='mt-3 font-bold'>Place of Birth</li>
                        <li>{actor?.place_of_birth}</li>
                    </ul>
                </div>
                <div className='my-4 mx-16'>
                    <h1 className='font-bold text-lg'>Movies Acted</h1>
                    <div className='flex flex-wrap'>
                    {moviesActed.slice(0,20).map((movie) => (
                        <img key={movie?.id} src={IMAGE_BASE_URL + movie?.poster_path} alt='movie_img' className='w-40 h-52 m-2 rounded-lg'/>
                    ))}
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ActorDetails