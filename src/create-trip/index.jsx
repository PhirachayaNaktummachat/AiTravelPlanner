import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { chatSession } from '../service/AIModal';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
    const [place,setPlace]=useState();

    const navigate = useNavigate();

    const [formData,setFormData]=useState([]);

    const [openDailog,setOpenDailog]=useState(false);

    const [loading,setLoading]=useState(false);

    const handleInputChange=(name,value)=>{

      setFormData({
        ...formData,
        [name]:value
      })
    }

    useEffect(()=>{
      console.log(formData);
    },[formData])

    const login=useGoogleLogin({
      onSuccess:(codeResp)=>GetUserProfile(codeResp),
      onError:(error)=>console.log(error)
    })

    const OnGenerateTrip=async()=>{


      // const user=localStorage.getItem('user');
      const user=localStorage.getItem('user');
      
      if(!user)
      {
        setOpenDailog(true)
        return;
      }

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

        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{totalDays}',formData?.noOfDays)
        .replace('{traveler}',formData?.traveler)
        .replace('{budget}',formData?.budget)

        const result=await chatSession.sendMessage(FINAL_PROMPT);

        console.log("--", result?.response?.text());

        setLoading(false);

        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip=async(TripData)=>{

      setLoading(true);

      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId

      });

      setLoading(false);
      navigate('/view-trip/'+docId);
    }


    const GetUserProfile = (tokenInfo) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }).then((resp) => {
        console.log(resp);
        localStorage.setItem('user',JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      })
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
        disabled={loading}
        onClick={OnGenerateTrip}
        className="rounded-md  bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" >
        {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> :'Generate Trip'
        }
        </button>
        </div>

        {/* ✅ Dialog Modal */}
      <Dialog open={openDailog} onClose={setOpenDailog}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* 🔹 ปุ่มกากบาท (X) ปิด Dialog */}
            <button
          onClick={() => setOpenDailog(false)}
          className="absolute top-2 right-0 text-gray-500 hover:text-black"
        >
          <X size={24} strokeWidth={2} /> {/* ไอคอน X แบบบาง */}
        </button>
        
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {/* <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Deactivate account
                  </DialogTitle> */}
                  <div>
                    <img src="/logo.svg"/>
                    <h2 className='font-bold text-lg mt-5'>Sign in with google</h2>
                    <p>Sign in to the App with Google authentication</p>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                
                type="button"
                onClick={login}
                className="w-full flex items-center justify-center gap-4 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:w-full bg-black" >
                <FcGoogle className='w-7 h-7'/>
                Sign in with Google
              </button>
              
            </div>
          </DialogPanel>
        </div>
      </div>
      </Dialog>


        

    </div>
  )
}

export default CreateTrip