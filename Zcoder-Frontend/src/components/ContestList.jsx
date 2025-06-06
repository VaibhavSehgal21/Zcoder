import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './ContestList.css'; // Import the CSS file

const API_URL = 'https://clist.by/api/v1/contest/';
const API_KEY = 'tarun060803:f72f36f88a0e92adb2e844c64e93c3b49d588a0b';

const allowedPlatforms = [
    'codingninjas.com/codestudio',
    'codeforces.com',
    'atcoder.jp',
    'leetcode.com',
    'geeksforgeeks.org',
    'codechef.com',
   
];

const logo = new Map();
logo.set('atcoder.jp', '/images/atcoder.png');
logo.set('leetcode.com', '/images/leetcode.png');
logo.set('codeforces.com', '/images/codeforces.png');
logo.set('codechef.com', '/images/codechef.png');
logo.set('geeksforgeeks.org', '/images/GeeksforGeeks.png');
logo.set('codingninjas.com/codestudio', '/images/codingNinja.png');
//logo.set('projecteuler.net','/images/euler.jpg');

const ContestList = () => {
    const [contests, setContests] = useState([]);
    const [uniquePlatforms, setUniquePlatforms] = useState([]);
    const [filteredPlatform, setFilteredPlatform] = useState('all');
    const [reminderButtons, setReminderButtons] = useState({});

    useEffect(() => {
        fetchContests();
    }, []);

    useEffect(() => {
        const platformFilter = document.getElementById('platform-filter');
        const contestCards = document.querySelectorAll('.contest-card');

        const handlePlatformChange = (e) => {
            const selectedPlatform = e.target.value;
            contestCards.forEach(card => {
                if (selectedPlatform === 'all' || card.getAttribute('data-platform') === selectedPlatform) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        platformFilter.addEventListener('change', handlePlatformChange);

        return () => {
            platformFilter.removeEventListener('change', handlePlatformChange);
        };
    }, []);

    const fetchContests = async () => {
        const currentDateTime = new Date().toISOString();
        const oneMonthFromNow = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
        const url = `${API_URL}?username=${API_KEY.split(':')[0]}&api_key=${API_KEY.split(':')[1]}&order_by=start&start__gt=${currentDateTime}&start__lt=${oneMonthFromNow}`;
        
        const { data } = await axios.get(url);

        const contests = data.objects
            .filter(contest => allowedPlatforms.includes(contest.resource.name))
            .map(contest => {
                let start_date_gmt = moment.utc(contest.start, 'YYYY-MM-DD HH:mm:ss');
                let end_date_gmt = moment.utc(contest.end, 'YYYY-MM-DD HH:mm:ss');
                let start_date_ist = start_date_gmt.clone().tz('Asia/Kolkata');
                let end_date_ist = end_date_gmt.clone().tz('Asia/Kolkata');

                return {
                    id: contest.id,
                    name: contest.event,
                    start_date: start_date_ist.format('YYYY-MM-DD HH:mm:ss'),
                    end_date: end_date_ist.format('YYYY-MM-DD HH:mm:ss'),
                    duration: contest.duration,
                    platform: contest.resource.name,
                    link: contest.href
                };
            });

        setContests(contests);
        setUniquePlatforms([...new Set(contests.map(contest => contest.platform))]);
    };

    const splitDateTime = (dateTime) => {
        const [date, time] = dateTime.split(' ');
        return { date, time };
    };

    const handleSetReminder = (id, name, startDate, link) => {
        const startDateObj = new Date(startDate);
        const reminderDate = new Date(startDateObj.getTime() - 2 * 60 * 1000); // 2 minutes before start time

        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        const existingReminder = reminders.find(r => r.id === id);
        const reminderButton = document.getElementById(`reminder-btn-${id}`);
        if (existingReminder) {
            if (reminderButton) {
                reminderButton.innerText = 'Reminder Set';
                reminderButton.style.background = '#bdce00';
                reminderButton.disabled = true;
            }
            alert('Reminder already set for this contest!');
            // If reminder already exists, do nothing or handle as needed (e.g., update UI)
            setReminderButtons(prevButtons => ({
                ...prevButtons,
                [id]: true
            }));
        } else {
            const newReminder = {
                id,
                name,
                startDate: reminderDate,
                link
            };
            
            reminders.push(newReminder);
            localStorage.setItem('reminders', JSON.stringify(reminders));

            // Update UI to indicate reminder set
            setReminderButtons(prevButtons => ({
                ...prevButtons,
                [id]: true
            }));

            
            if (reminderButton) {
                reminderButton.innerText = 'Reminder Set';
                reminderButton.style.background = '#bdce00';
                reminderButton.disabled = true;
            }

          
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            const currentDateTime = new Date();

            const remainingReminders = reminders.filter(reminder => {
                const reminderDate = new Date(reminder.startDate);

                if (currentDateTime.getTime() >= reminderDate.getTime()) {
                    alert(`Reminder: ${reminder.name} is starting soon!\nContest link: ${reminder.link}`);
                    return false; // Remove this reminder
                }
                return true; // Keep this reminder
            });

            localStorage.setItem('reminders', JSON.stringify(remainingReminders));
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='contests-list'>
            <h1 className="text-4wl sm:text-6xl lg:text-7xl text-center tracking-wide mb-5">Contest List</h1>
            <label htmlFor="platform-filter" className='mr-4 mt-4'>Filter by platform:</label>
            <select id="platform-filter" onChange={(e) => setFilteredPlatform(e.target.value)}>
                <option value="all">All</option>
                {uniquePlatforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                ))}
            </select>

            <div id="contests">
                {contests.filter(contest => filteredPlatform === 'all' || contest.platform === filteredPlatform).map(contest => (
                    <div className="contest-card" data-platform={contest.platform} key={contest.id}>
                        <div className='card-text'>

                        <h2>{contest.name}</h2>
                        <p>
                            <br/>
                            Start :&ensp;
                            <span className="date">{splitDateTime(contest.start_date).date}</span>
                            <span className="time">{splitDateTime(contest.start_date).time}</span>
                        </p>
                        <p>
                            End :&ensp; 
                            <span className="date">{splitDateTime(contest.end_date).date}</span>
                            <span className="time">{splitDateTime(contest.end_date).time}</span>
                        </p>
                       
                        </div>
                        <p className='logoo'>
                            {logo.has(contest.platform) ? (
                                <img src={logo.get(contest.platform)} alt={contest.platform} style={{ width: '50px', height: '50px' }} />
                            ) : (
                                contest.platform
                            )}
                        </p>
                        <p><a href={contest.link} target="_blank" rel="noopener noreferrer">Contest Link</a></p>
                        <button
                            style={{
                                background: 'linear-gradient(to right, #F97316, #C2410C)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                marginBottom: '5px',
                                marginTop:'3px'
                            }}
                            id={`reminder-btn-${contest.id}`}
                            className={`set-reminder-btn ${reminderButtons[contest.id] ? 'reminder-set' : ''}`}
                            onClick={() => handleSetReminder(contest.id, contest.name, contest.start_date, contest.link)}
                            disabled={reminderButtons[contest.id]}
                        >
                            {reminderButtons[contest.id] ? 'Reminder Set' : 'Set Reminder'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContestList;
