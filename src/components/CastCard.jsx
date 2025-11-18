import React from 'react'
import { CAST_IMAGE_URL } from '../services/constants';

const ActorCard = (props) => {
    const {data} = props;

  return (
    <div>
        <div className='bg-white rounded-lg shadow-md  w-35 m-4'>
            <img src={CAST_IMAGE_URL + data?.profile_path} alt="cast_img" className='rounded-t-lg'/>
            <div className='p-1 text-center'>
                <p className='font-bold text-sm'>{data?.name}</p>
                <p className='text-sm'>{data?.character}</p>
            </div>
        </div>
    </div>
  )
}

export default ActorCard;