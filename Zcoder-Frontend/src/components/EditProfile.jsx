
import {toast} from 'react-toastify';
import React from 'react'
import { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { baseUrl } from '../url';

const EditProfile = () => {
    const navigateTo = useNavigate();
    const [id,setId]=useState('');
    



    const Skills_array = [
      'WebDevelopment',
      'AppDevelopment',
      'Competitive programming',
      'Machine Learning',
    ];
    
    const [selectedSkills, setSelectedSkills] = useState([]);
  
    const handleSkills = (skill) => {
      setSelectedSkills((prevSelectedSkills) =>
        prevSelectedSkills.includes(skill)
          ? prevSelectedSkills.filter((t) => t !== skill)
          : [...prevSelectedSkills, skill]
      );
    };
    const [credentials, setCredentials] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      city: '',
      college: '',
      userhandle:'',
      about:'',
      skills: []
  
    
    });
    useEffect(()=>{
        if(localStorage.getItem('success')){
            const user=JSON.parse(localStorage.getItem('user'));
            setId(user._id);
            setCredentials({
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              password: user.password,
              city: user.city,
              college: user.college,
              userhandle:user.userhandle,
              about:user.about,
              skills: user.skills
            })
           
        }
    },[])
    const handleSubmit = async (e) => {
      e.preventDefault();
      
   credentials.skills=selectedSkills;
        
  
      try {
        const response = await fetch(`${baseUrl}/update?userId=${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(credentials),
        });
       
      // history.push('/home');
        if (!response.ok) {
          
          alert("Invalid credentials")
  
          //navigateTo('/')
        } else {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('success',"true")
          console.log(data);
          toast.success("Profile updated successfully")
          navigateTo('/myprofile')
       // navigateTo('/login')
           // Uncomment this to navigate to home after successful registration
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    const onChange = (e) => {
      const { name, value} = e.target;
     
        setCredentials({ ...credentials, [name]: value });
        
      
    };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div>
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                  Profile
                </h1>
                <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Edit Profile</h2>

              

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="first_name" className="mb-2 dark:text-gray-300">First Name</label>
                    <input type="text" name="first_name" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="First Name" value={credentials.first_name} 
                    onChange={onChange}required/>
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="last_name" className="dark:text-gray-300">Last Name</label>
                    <input type="text" name="last_name" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Last Name" value={credentials.last_name} onChange={onChange}required />
                  </div>
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="email" className="mb-2 dark:text-gray-300">User handle</label>
                    <input type="text" name="userhandle" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="User handle" value={credentials.userhandle} onChange={onChange}required />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="password" className="dark:text-gray-300">Password</label>
                    <input type="password" name="password" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Password" value={credentials.password} onChange={onChange} required/>
                  </div>
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="city" className="mb-2 dark:text-gray-300">City</label>
                    <input type="text" name="city" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="City" value={credentials.city} onChange={onChange}required />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="college" className="dark:text-gray-300">College</label>
                    <input type="text" name="college" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="College" value={credentials.college} onChange={onChange} required />
                  </div>
                </div>

                <div className="w-full mb-4 mt-6">
                    <label htmlFor="about" className="mb-2 dark:text-gray-300">About me</label>
                    <input type="text" name="about" className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="About me" value={credentials.about} onChange={onChange}required />
                  </div>


                  <div>
          <label htmlFor="skills" className="block text-sm font-medium mb-1 text-gray-300">Skills</label>
          <div className="bg-gray-700 p-2 rounded-md">
      {Skills_array.map((skill) => (
        <div key={skill} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={skill}
            value={skill}
            checked={selectedSkills.includes(skill)}
            onChange={() => handleSkills(skill)}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <label htmlFor={skill} className="ml-2 text-gray-300">{skill}</label>
        </div>
      ))}
    </div>
        </div>

                <button type="submit" className="mt-6 p-4 w-full bg-blue-500 text-white rounded-lg">Submit</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default EditProfile
