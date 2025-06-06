import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { testimonials } from "../constants";
import { features } from "../constants";
import bg from "../assets/bg1.svg";
import Navbar from "./Nav";
import bg2 from "../assets/bg2.jpg";


const HeroSection = () => {
  const user = localStorage.getItem('user');
  const href = user ? '/bookmark' : '/login';

  return (
  
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      
    <h1 className="text-4wl sm:text-6xl lg:text-7xl text-center tracking-wide">
        All Your Coding Challanges
        
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        {" "}  
        at  One Place
        </span>
    </h1>


    <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
    Welcome to Zcoder, the ultimate hub for all your bookmarked coding problems! Collect and manage your favorite challenges from various coding platforms in one place. Start solving and keep track of your progress effortlessly!
    </p>


    <div className="flex justify-center my-10">
      <a href={href} className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md">Start for Free</a>
    </div>
    <div className="flex mt-10 justify-center">
        <img src={bg} alt="" className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4" />
        <img src={bg2} alt="" className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4" />
      </div>

     
      <div  id='features' className="text-center mt-10">
        
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Featu
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            res
          </span>
        </h2>
      </div>
      <div  className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  

      <div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p>{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

        
    </div>
   
  )
}

export default HeroSection

