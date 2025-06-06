import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import { baseUrl } from '../url';
import logo from '../assets/logo.png';

const SignUp = () => {

   
    const navigateTo = useNavigate();
    const [credentials, setCredentials] = useState({
     
      email: '',
      password: '',
      
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        

       
    
        try {
          const response = await fetch(`${baseUrl}/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });

        
         
        // history.push('/home');
          if (!response.ok) {
            toast.error("Invalid credentials")
            const errorData = await response.json();
            console.error("Error:", errorData);
           
          } else {
            const data = await response.json();
            console.log(data);

            console.log(data.user.first_name)
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('success',"true")
            toast.success("Login successful")
            const Profile = data.user;
           // console.log(Profile)
            
            navigateTo('/',{state:{Profile:Profile}})
             // Uncomment this to navigate to home after successful registration
          }
        } catch (error) {
          toast.error("Invalid credentials")
          console.error("Fetch error:", error);
         
        }
      };

      const onChange = (e) => {
        const { name, value, type, files } = e.target;
       
          setCredentials({ ...credentials, [name]: value });
        
      };
  return (
   


    

  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo}alt="logo"/>
         Zcoder    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={credentials.email} onChange={onChange}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password"  value={credentials.password} onChange={onChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="/editprofile" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>


   
  )
}

export default SignUp
