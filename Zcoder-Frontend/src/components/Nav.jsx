import {Menu,X} from "lucide-react";
import {useState }from "react";
import logo from '../assets/logo.png';
import { navItems } from '../constants';
import {useEffect } from 'react';
import arrow from '../assets/arrow.svg';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useLocation } from "react-router-dom";



 const Navbar = () => {

  //const location = useLocation();
 // console.log(location.state.Profile)
  const [user,setUser]=useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('success')){
      const user=JSON.parse(localStorage.getItem('user'));
      setUser(user.first_name);
    }
  })


  const handleLogout=()=>{
    toast.success("Logout successful");
    localStorage.removeItem('success');
    localStorage.removeItem('user');
  
    window.location.href='/';
   
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'myprofile') {
      window.location.href = '/myprofile';
    }else if(selectedValue==='logout'){
      handleLogout();
    }
  };

  const [mobileDrawerOpen,setMobileDrawerOpen]=useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const toggleNavbar=()=>{
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
   <nav className="nav sticky top-0 z-50 py-3  border-b border-neutral-700/80">
   
    <div className="container px-4 mx-auto relative text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          <img className="h-10 w-10 mr-2" src={logo} alt="logo" />

          <span className="text-xl tracking-tight">Zcoder</span> 
        </div>


        <ul className="hidden lg:flex ml-14 space-x-12">
          {
            navItems.map((item,index)=>(
              <li key ={index}>
                <a href= {item.href}>{item.label}</a>
                </li>
            ))}
          
        </ul>

        {!user?<div className="hidden lg:flex justify-center space-x-12 items-center">
          <a href="/login"className="py-2 px-3 border rounded-md">
            Sign In
          </a>

          <a href="/register" className=" bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 border rounded-md">
            Create an account 
          </a>
        </div>: 
        (
       
        



        <div className="hidden lg:flex ">

<form className="max-w-sm mx-auto">
  <select id="login" onChange={handleSelectChange} className="lg:flex justify-center space-x-5  items-center bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-2 border rounded-md cursor-pointer">

    <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{user}</option>
    <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value ="myprofile">
      My Profile </option>
    <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" value ="logout">Logout</option>
   
  </select>
</form>
         
          
        </div>
       
      )
        
       }   
    
        <div className="lg:hidden md:flex flex-col justify-end">
          <button onClick={toggleNavbar} >
          {mobileDrawerOpen? <X />:<Menu />}
          </button>
        </div>
      </div>




     {mobileDrawerOpen && ( <div className="
      fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
        <ul>
        {navItems.map((item,index)=>(
              <li key ={index} className="py-4">
                <a href= {item.href}>{item.label}</a>
                </li>
            ))}
        </ul>

        {!localStorage.getItem('success')?<div className="flex space-x-6">
        <a href="/login" className="py-2 px-3 border rounded-md">Sign In</a>
        <a href="/register"className=" bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 border rounded-md">
            Create an account
          </a>
       </div>:(
       <form className="max-w-sm mx-auto">
       <select id="login" onChange={handleSelectChange} className="lg:flex justify-center space-x-5  items-center bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-2 border rounded-md cursor-pointer">
     
         <option className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{user}</option>
         <option value ="myprofile">My Profile </option>
         <option value ="logout">Logout</option>
        
       </select>
     </form>
       )
       }
      

      </div>)}

    </div>
   </nav>
   

  )
}
export default Navbar;