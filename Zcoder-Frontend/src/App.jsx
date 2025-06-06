import React from 'react';
import { createBrowserRouter , Route, RouterProvider } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Register from './components/Register';
import Bookmark from './components/Bookmark';
import AddQuestion from './components/AddQuestion';
import MyBookmarks from './components/MyBookmarks';
import MyProfile from './components/MyProfile';
import AddHandle from './components/AddHandle';
import EditProfile from './components/EditProfile';
import SeeProfile from './components/SeeProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Friends from './components/Friends';
import ShowQuestion from './components/ShowQuestion';
import ContestList from './components/ContestList';


const App = () => {

  const router=createBrowserRouter([
    {
      path:'/home',
      element: <HeroSection />
     
    },
    {
      path:'/',
      element: <HeroSection />
     
    },
    {
      path:"/login",
      element:<SignUp/>

    },

    {
      path:"/register",
      element:<Register/>

    },
    {
      path:"/bookmark",
      element:<Bookmark/>

    }
    ,
    {
      path:"/addquestion",
      element:<AddQuestion/>

    },
    {
      path:"/mybookmarks",
      element:<MyBookmarks/>

    },
    {
      path:"/myprofile",
      element:<MyProfile/>

    }
    ,
    {
      path:"/addhandle",
      element:<AddHandle/>

    }
    ,
    {
      path:"/editprofile",
      element:<EditProfile/>

    },
    {
      path:"/seeprofile",
      element:<SeeProfile/>},

      {
        path:"/friends",
        element:<Friends/>
      },

      {
        path:"/showquestion",
        element:<ShowQuestion/>
      },
      {
        path:"/contests",
        element:<ContestList/>
      }

  ])
  return (
    <>
    
     <Nav />
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Bounce/>
      <div className="max-w-7xl mx-auto pt-20 px-6">
      <RouterProvider router={router}/>
       
       
       
        <Footer />
      </div>



      
      </>
    
  );
}

export default App;
