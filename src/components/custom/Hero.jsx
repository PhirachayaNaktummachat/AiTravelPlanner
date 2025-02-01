import React from 'react'
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center mx-56 gap-9 text-black'>
        <h1
        className='font-extrabold text-[40px] text-center mt-16'>
        <span className='text-[#4E78A6]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-xl text-gray-500 text-center'>
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
    
        <button
        onClick={() => navigate("/create-trip")}
        className="rounded-md  bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
        Get started, It's free</button>
    </div>
  )
}

export default Hero