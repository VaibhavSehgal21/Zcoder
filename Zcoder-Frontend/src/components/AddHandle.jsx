import React from 'react'
import {toast } from 'react-toastify'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../url';

const AddHandle = () => {
  const navigateTo =useNavigate();
    const [userId, setUserId] = useState('');
    const [handleName, setHandleName] = useState('');
    const [handleLink, setHandleLink] = useState('');
   
  
   const platformLinks = [ 'Codeforces','Codechef','Leetcode','Atcoder','Geeks for Geeks'];
    useEffect(() => {

        if (localStorage.getItem('success')) {
          const user = JSON.parse(localStorage.getItem('user'));
          //Using the user id to get the user id
          setUserId(user._id);
        }
    }, []);

    const handleTopicChange = (topic) => {
        setHandleName(topic);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newHandle = {userId, handleName, handleLink };
        console.log(newHandle);
        // You can add your API call here to submit the form
        try {
            const response = await fetch(`${baseUrl}/addHandles`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newHandle),
            });
    
         
           
          // history.push('/home');
            if (!response.ok) {
              const errorData = await response.json();
              console.error("Error:", errorData);
              toast.error("Invalid handle name or link")
            } else {
              const data = await response.json();
              console.log(data);
    
                toast.success("Handle added successfully")
            
              //
             navigateTo('/myprofile')
               
            }
          } catch (error) {
            console.error("Fetch error:", error);
          }
    
      };
  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10">
    <h2 className="text-2xl font-bold mb-4 text-white">Add your Favourite Platforn</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label htmlFor="topics" className="block text-sm font-medium mb-1 text-gray-300">Platform</label>
        <div className="bg-gray-700 p-2 rounded-md">
          {platformLinks.map((topic) => (
            <div key={topic} className="flex items-center mb-2">
              <input
                type="radio"
                id={topic}
                name="topic"
                value={topic}
               
                onChange={() => handleTopicChange(topic)}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <label htmlFor={topic} className="ml-2 text-gray-300">{topic}</label>
            </div>
          ))}
        </div>
      </div>
     
      <div>
        <label htmlFor="link" className="block text-sm font-medium mb-1 text-gray-300">Link</label>
        <input
          type="url"
          id="link"
          value={handleLink}
          onChange={(e) => setHandleLink(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
     
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add handle
      </button>
    </form>
  </div>
  )
}

export default AddHandle
