import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { baseUrl } from '../url'; // URL of the backend server
import { User } from 'lucide-react'; // Icon component for displaying user icon

const socket = io(baseUrl);

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState('');
  const [userid, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unknownMessages, setUnknownMessages] = useState([]);
  const [showUnknownMessages, setShowUnknownMessages] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({}); // State to track online users

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/profileid?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      return null;
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email) {
      setUser(storedUser.email);
    }
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${baseUrl}/profile?email=${user}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setFriends(data.user.following);
      } catch (error) {
        console.error('Fetch User Profile Error:', error);
        setError('Failed to fetch friends list');
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const fetchedProfiles = await Promise.all(friends.map((userId) => fetchProfile(userId)));
      setProfiles(fetchedProfiles.filter((profile) => profile !== null));
      setLoading(false);
    };

    if (friends.length > 0) {
      fetchProfiles();
    }
  }, [friends]);

  const fetchChat = async (friendEmail) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/friends?from=${user}&to=${friendEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }
      const data = await response.json();
      setChat(data); // Assuming data is an array of messages
    } catch (error) {
      console.error('Fetch Chat Error:', error);
      setError('Failed to fetch chat messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (selectedFriend && message) {
      const messageData = {
        senderEmail: user,
        receiverEmail: selectedFriend,
        messageText: message,
      };

      socket.emit('sendMessage', messageData);
      setMessage(''); // Clear message input
    } else {
      setError('Please select a friend and enter a message');
    }
  };

  useEffect(() => {
    if (userid) {
      // Emit userId after connection is established
      socket.emit('setUserId', userid);
    }
  }, [userid]);

  const handleFriendSelect = (friendEmail) => {
    if (selectedFriend === friendEmail) {
      setSelectedFriend(null); // Close chat if the same friend is selected again
    } else {
      setSelectedFriend(friendEmail);
      fetchChat(friendEmail); // Use friendEmail to fetch chat
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (message.users.includes(userid)) {
        if (friends.includes(message.sender) || friends.includes(message.receiver)) {
          setChat((prevChat) => [...prevChat, message]);
        } else {
          setUnknownMessages((prevMessages) => [...prevMessages, message]);
          // Store unknown messages in local storage
          localStorage.setItem('unknownMessages', JSON.stringify([...unknownMessages, message]));
        }
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userid, friends, unknownMessages]);

  // Listen for online users updates
  useEffect(() => {
    socket.on('userOnline', (onlineUsersData) => {
      setOnlineUsers(onlineUsersData);
    });

    return () => {
      socket.off('userOnline');
    };
  }, []);

  const handleUnknownMessages = () => {
    setShowUnknownMessages(!showUnknownMessages);
  };

  useEffect(() => {
    const storedUnknownMessages = JSON.parse(localStorage.getItem('unknownMessages')) || [];
    setUnknownMessages(storedUnknownMessages);
  }, []);


  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Friends</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-6 hover:bg-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center mb-4">
              <User className="w-10 h-10 text-white" />
              <div className="ml-4">
                <p className="text-xl font-medium">{profile.user.first_name} {profile.user.last_name}</p>
                <p className="text-sm text-gray-400">@{profile.user.userhandle}</p>
                <p className="text-sm text-gray-400">{profile.user.college}</p>
                {onlineUsers[profile.user._id] ? (
                  <span className="text-green-500 text-sm">Online</span>
                ) : (
                  <span className="text-gray-400 text-sm">Offline</span>
                )}
              </div>
            </div>
            <button
              className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-2 w-full"
              onClick={() => handleFriendSelect(profile.user.email)}
            >
              Chat
            </button>
          </div>
        ))}
      </div>

      {/* Chat section */}
      {selectedFriend && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Chat with {selectedFriend}</h2>
          <div className="border border-gray-700 p-4 rounded-lg h-64 overflow-y-scroll bg-gray-900">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-2 ${msg.sender === userid ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === userid ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                  }`}
                >
                  {msg.message.text}
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-700 rounded-lg p-2 w-full mt-2 bg-gray-800 text-white"
          />
          <button
            className="bg-blue-600 text-white rounded-lg px-4 py-2 mt-2 w-full"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      )}

      {/* Toggle unknown messages section */}
      <button
        className="bg-red-600 text-white rounded-lg px-4 py-2 mt-6"
        onClick={handleUnknownMessages}
      >
        {showUnknownMessages ? 'Hide Unknown Messages' : 'Show Unknown Messages'}
      </button>

      {showUnknownMessages && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Unknown Messages</h2>
          <div className="border border-gray-700 p-4 rounded-lg h-64 overflow-y-scroll bg-gray-900">
            {unknownMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 ${msg.sender === userid ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === userid ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'
                  }`}
                >
                  {msg.senderhandle} : {msg.message.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
