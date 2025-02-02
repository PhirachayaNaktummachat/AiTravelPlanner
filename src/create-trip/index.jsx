import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { chatSession } from '../service/AIModal';

function CreateTrip() {
    const [place,setPlace]=useState();

    const navigate = useNavigate();

    const [formData,setFormData]=useState([]);

    const handleInputChange=(name,value)=>{

      // if(name=='noOfDays'&&value>5)
      // {
      //   console.log("Please enter Trip days less than 5")
      //   return;
      // }

      setFormData({
        ...formData,
        [name]:value
      })
    }

    useEffect(()=>{
      console.log(formData);
    },[formData])

    const OnGenerateTrip=async()=>{
      if (!formData?.location||!formData?.budget||!formData?.traveler||!formData?.noOfDays)
      {
        toast.error("Please fill all details", {
        });
        return;
      }

      if(formData?.noOfDays > 10 )
        {
          toast.error("The number of days must not exceed 10 days", {
          });
          return;
        }

const FINAL_PROMPT=AI_PROMPT
.replace('{location',formData?.location?.label)
.replace('{totalDays',formData?.noOfDays)
.replace('{traveler}',formData?.traveler)
.replace('{budget}',formData?.budget)

console.log(FINAL_PROMPT);

const result=await chatSession.sendMessage(FINAL_PROMPT);

console.log(result?.response?.text());

    }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🏝️</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
    
        <div className='mt-20 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-bold'>What is destination of choice?</h2>
                <GooglePlacesAutocomplete
                 apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                 selectProps={{
                    place,
                    onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
                 }}
                />
            </div>
        </div>

        <div className='mt-10'>
          <h2 className='text-xl my-3 font-bold'>How many days are you planning your trip?</h2>
          <input className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600"
            placeholder={'Ex.3'} type="number" 
            onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
            />
            
        </div>

        <div className='mt-10'>
        <h2 className='text-xl my-3 font-bold'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border cursor-pointer rounded-lg transition-all
    ${formData?.budget === item.title ? 'border-black shadow-lg' : 'border-gray-300'} 
    hover:shadow-lg hover:border-black

            `}>
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
        </div>

        <div className='mt-10'>
        <h2 className='text-xl my-3 font-bold'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5'>
          {SelectTravelesList.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border cursor-pointer rounded-lg transition-all
    ${formData?.traveler === item.people ? 'border-black shadow-lg' : 'border-gray-300'} 
    hover:shadow-lg hover:border-black
            `}>
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
        </div>

        <div className='my-10 justify-end flex'>
        <button 
        onClick={OnGenerateTrip}
        className="rounded-md  bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
        Generate Trip
        </button>
        </div>
    </div>
  )
}

export default CreateTrip