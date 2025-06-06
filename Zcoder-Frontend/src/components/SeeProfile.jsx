import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";
import { useState } from 'react';
import avatar from '../assets/avatar.png';
import {toast} from 'react-toastify';
import { baseUrl } from '../url';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


const SeeProfile = () => {
  const location = useLocation();
 const data = location.state.data.user;
 const navigate = useNavigate();
  //console.log(data);

  
  const goBack = () => {
    navigate(-1); // This will go back one step in the history stack
  };

  const [person, setPerson] = useState('');

  const [id, setId] = useState('');
  
  useEffect(()=>{
    if(localStorage.getItem('success')){
      const user=JSON.parse(localStorage.getItem('user'));
      setPerson(user._id);
      setId(data._id);
    }
  })

 
  const platforms = [
    {
      name: 'Codeforces',
     icon: <img src={img1} alt="codeforces" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cf',
      
     link:data.handles.Codeforces,
   

     


      
     
    },
    {
      name: 'CodeChef',
     icon: <img src={img5} alt="codechef" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:data.handles.Codechef, 
    },
    {
      name: 'LeetCode',
      icon: <img src={img2} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:data.handles.Leetcode,
      
    },
    {
      name: 'Atcoder',
      icon: <img src={img4} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:data.handles.Atcoder,
     
    },

    {
      name: 'Geeks for Geeks',
      icon: <img src={img3} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:data.handles.GeeksforGeeks,
      
    },
  ];

  const follow = async (e) => {
    e.preventDefault();


    try {

    const  response =  await fetch(`${baseUrl}/follow/${person}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userIdtofollow:id})
    });
    

    

    if(response=="You cannot follow himself"){
      toast.error('You cannot follow himself');
    }
    
    if(response.ok){

    toast.success('Followed Successfully');

    navigateTo('/myprofile');
    //console.log(data);

    } else {
      toast.error('You cannot follow yourself');
    }}
    catch (error) {
      console.error("Fetch error:", error);
    }





  }
 
  
  return (
    <div>
    <span className=" flex gap-2 items-center font-bold text-3xl text-white justify-center mr-5 mb-5">    <ArrowLeft  className='cursor-pointer' onClick={()=>goBack()} />
         {data.first_name}'s Profile</span>
    
       <div class="container mx-auto my-20">
         
        <div>

         
       
            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
           
                <div class="flex justify-center">
                        <img src={avatar} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                </div>
                
                <div class="mt-16">
                    <h1 class="font-bold text-center text-3xl text-gray-900">{data.first_name}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium">{data.college}</p>
                 
                    <div class="my-5 px-6 justify-center">
                        <a onClick={follow}  className=" justify-center text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white cursor-pointer">Connect with <span class="font-bold">@{data.userhandle}</span></a>
                    </div>
                  

                    <div className="p-4 max-w-screen-lg mx-auto mt-12">
      <p className="text-gray-700 font-bold  text-lg">User Handles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mr-4">{platform.icon}</div>
            <div>
            <a href={platform.link} target="_blank" className="text-gray-700 font-medium mt-1 text-shadow hover:text-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                {platform.name}
              </a>
             
            </div>
          </div>
        ))}
      </div>
    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
    
  )
}

export default SeeProfile
