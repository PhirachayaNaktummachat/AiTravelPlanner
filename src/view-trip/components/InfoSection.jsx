import React from 'react'
import { useEffect } from 'react';
import { GetPlacedetails } from '../../service/GlobalApi';

function InfoSection({trip}) {

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
 
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result =await GetPlacedetails(data).then(resp=>{
      console.log(resp.data)
    })
  }
  return (
    <div>
        <img src='/placeholder.jpg' className='h-[300px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip.userSelection?.budget} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Traveler {trip.userSelection?.traveler} Days</h2>

                </div>
            </div>

        </div>
    </div>
  )
}

export default InfoSection