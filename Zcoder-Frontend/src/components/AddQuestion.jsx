import React, { useState, useEffect } from 'react';
import {useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../url';
const AddQuestionForm = () => {
    const navigateTo = useNavigate();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [user, setUser] = useState('');
  const topicsOptions = [ 'Arrays','Linked List','Dynamic Programming','Graphs','Trees','Sorting and Searching'];

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
    }
  }, []);
  const handleTopicChange = (topic) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((t) => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

 const handleSubmit = async(e) => {
    e.preventDefault();
    const newQuestion = { title, link, topics: selectedTopics, solution };
    console.log(newQuestion);
    // You can add your API call here to submit the form
    try {
        const response = await fetch(`${baseUrl}/questions?email=${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        });

      console.log(response)
       
      // history.push('/home');
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Invalid credentials")
        } else {
          const data = await response.json();
          console.log(data);

         // console.log(data.user.first_name)
          //localStorage.setItem('user', JSON.stringify(data.user));
          //localStorage.setItem('success',"true")
          toast.success("Question added successfully")
          
          navigateTo('/bookmark')
           // Uncomment this to navigate to home after successful registration
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }

  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium mb-1 text-gray-300">Link</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="topics" className="block text-sm font-medium mb-1 text-gray-300">Topics</label>
          <div className="bg-gray-700 p-2 rounded-md">
            {topicsOptions.map((topic) => (
              <div key={topic} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={topic}
                  value={topic}
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <label htmlFor={topic} className="ml-2 text-gray-300">{topic}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="solution" className="block text-sm font-medium mb-1 text-gray-300">Solution</label>
          <textarea
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500 font-mono"
            rows="10"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
