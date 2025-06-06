import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {toast} from 'react-toastify';
import { baseUrl } from '../url';
import { coy as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bookmark, BookmarkPlus, ChevronDown, ChevronUp, CirclePlus, MessageCircleMore, MessageCirclePlus, MessageSquareText } from 'lucide-react';
import axios from 'axios';




const BookmarkedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [disscussion, setDisscussion] = useState([]);

  const [showComments, setShowComments] = useState({});

  const [showDiscussion, setShowDiscussion] = useState({}); 

  const toggleComments = () => {
    setShowComments(!showComments);
  };


  const [isTextAreaVisible, setTextAreaVisible] = useState({});
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    
  };
  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
  
    fetchQuestions();
  }, [user]);






  const addQuestion= ()=> {
    window.location.href='/addquestion';
  }

  const [solutionVisibility, setSolutionVisibility] = useState({});

  const toggleSolutionVisibility = (questionId) => {
    setSolutionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  };

  const toggleComments2 = (questionId) => {
   setTextAreaVisible((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  }

  const toggleDisscussion = (questionId) => {
    setShowComments((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  }
  const addComment = async (questionId) => {
    try {
      const response = await fetch(`${baseUrl}/comment/${questionId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post comment');
      }

      const data = await response.json();
      console.log(data);
      setTextAreaVisible(false);
      fetchQuestions();
      toast.success('Comment posted successfully');
    
    } catch (error) {
      console.error(error);
    }
  }


  const fetchQuestions = async () => {
    if (!user) return; // If user is not set, return early
    try {
      const response = await fetch(`${baseUrl}/question?email=${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
      }

      const data = await response.json();
      console.log(data);
      setQuestions(data.questions);
      setDisscussion(data.comments);
      console.log(data.comments);
      //console.log(data.questions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };




  const MyBookmarks=()=>{
    window.location.href='/mybookmarks';
  }

  const  bookmarkQuestion = async (questionId) =>{
    // Example: log the question ID to the console
   // console.log("Bookmarking question with ID:", questionId);


    try {
      const response = await fetch(`${baseUrl}/bookmark/${questionId}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status===400) {
        //const errorData =  response.json();
          const text = await response.text();

          if(text==="Question already bookmarked"){
            toast.error("Question already bookmarked");
          }
          fetchQuestions();
          return;
      
       // throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
       
    }

     
      
      const data = await response.json();
     
    console.log(data);
    toast.success("Question Bookmarked Successfully");
    } catch (error) {
      setError(error.message);
    } 
  
    
   
 }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between ">
      <h2 className="text-2xl font-bold mb-4 text-white"> Questions</h2>
      <button  onClick={addQuestion} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      <span className='flex justify-between items-center gap-2'>
              <CirclePlus/>  Add a Question
              </span>
      </button>
      <button  onClick={MyBookmarks} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      <span className='flex justify-between items-center gap-2'>
              <Bookmark/> My Bookmarks
              </span>
       </button>
      </div>
  
  <div id="questions-container" className="space-y-4">
    {questions.map((question) => (
      <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
        <h3 className="text-xl font-semibold text-blue-400 mb-2">{question.title}
          
        </h3>
        <button
              onClick={() => bookmarkQuestion(question._id)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <span className='flex justify-between items-center gap-2'>
             <BookmarkPlus/>
              </span>
             
              
            </button>
        <a href={question.link} target='blank' className="text-blue-300 underline hover:text-blue-500 mb-2 block">Link to the Problem</a>
        <p className="text-white-400 mb-2 cursor-pointer"><strong>Topics:</strong> {question.topics.join(", ")}</p>
        <div>
      <button
        onClick={()=>toggleSolutionVisibility(question._id)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
       {solutionVisibility[question._id] ? 'Hide Solution' : 'Show Solution'}
      </button>
      
      {solutionVisibility[question._id]&& (
        <p className="text-gray-400">
          <strong>Solution:</strong>
          <SyntaxHighlighter language="cpp" style={codeStyle} showLineNumbers>
            {question.solution}
          </SyntaxHighlighter>
        </p>
      )}
    </div>

     
      
    
   

    <div className="">

    
      <button
        onClick={()=>toggleDisscussion(question._id)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showComments[question._id] ? (
  <div className='flex items-center gap-2'>
    <MessageCircleMore/>
    Disscussion <ChevronUp />
  </div>
) : (
  <div className='flex items-center gap-2'  >
     <MessageCircleMore/>
    Disscussion  <ChevronDown />
   
  </div>
)}
      </button>
      {showComments[question._id] &&(
        <div className="mt-4">

          <div className='border p-4 rounded-lg'>

      <button
        onClick={() => toggleComments2(question._id)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
         <span className='flex items-center gap-2'><MessageCirclePlus/> Add Comment</span>
     
      </button>
      {isTextAreaVisible[question._id] && (
        <div className="mt-4  rounder-lg p-3">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded"
            placeholder="Write your comment here..."
          />
          <button
            onClick={() => addComment(question._id)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            <span className='flex items-center gap-2'>
            <MessageSquareText/>Post Comment
            </span>
             
          </button>
        </div>
      )}
      </div>
          {disscussion
          .filter(comment => comment.questionId=== question._id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((comment) => (
            <div key={comment.id} className="p-2 border mt-4 ">
              <h2 className='font-semibold'>{comment.userId.userhandle}  :</h2>
              {comment.comment}
            </div>
          ))}
        </div>
      )}
    </div>
      </div>
    


    
      
    ))}
  </div>
</div>


  );
};

export default BookmarkedQuestions;
