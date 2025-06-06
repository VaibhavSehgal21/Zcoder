import { School } from "lucide-react";
import { GlobeLock } from "lucide-react";
import { User } from "lucide-react";
import { SquareDashedBottomCode } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import { CalendarFold } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";



export const navItems = [
  { label: "Home", href: "/home" },
 
  { label: "Problems ", href: "/bookmark" },
  { label: "Social", href: "/friends" },
  {label : "Calendar" , href: "/contests"}
 

   
];

export const testimonials = [
  {
    user: "Arjun Mehta",
    company: "InnovaTech Solutions",
    image: user1,
    text: "The website developed for our Coding Club is outstanding! The team’s attention to detail and user-friendly design have made it an essential platform for our members.",
  },
  {
    user: "Priya Sharma",
    company: "Skyline Technologies",
    image: user2,
    text: "The functionality and features integrated into the website are exactly what we needed. The team’s ability to turn our requirements into reality was impressive.",
  },
  {
    user: "Rohit Kapoor",
    company: "IIT Guwahati 2nd Year",
    image: user3,
    text: "I’m impressed with the seamless user experience and the interactive features. The comment system and contest integration have made a significant impact on our community.",
  },
  {
    user: "Anjali Patel",
    company: "IIT Guwahati 3rd Year",
    image: user4,
    text: "The platform handles everything from user profiles to coding discussions effortlessly. The team’s expertise and commitment are evident in the final product.",
  },
  {
    user: "Vikram Rao",
    company: "Visionary Creations",
    image: user5,
    text: "The website is a perfect tool for our club's activities. The frontend is smooth, intuitive, and exactly what we were looking for. Great work by the team!",
  },
  {
    user: "Neha Verma",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure the project was a success. The result is a beautifully designed, highly functional website that serves our club’s needs perfectly.",
  },
];

export const features = [
  {
    icon:<User />,
    text: "Customised User Profiles",
    description:
      "Users can create and customize their unique coding identity. They can add their coding handles and bio.",
  },
  {
    icon: <School />,
    text: "Collaborative Learning",
    description:
      " Users can comment on each other's solutions.",
  },
  {
    icon: <SquareDashedBottomCode />,
    text: "Upload Coding Problems",
    description:
      "Users can upload their coding problems from various platforms and can discuss them.",
  },
  {
    icon: <BookmarkCheck />,
    text: "Bookmark Coding Problems",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <CalendarFold />,
    text: "Comphresive Contest Calender",
    description:
      "Users can view upcoming contests from various platforms and can add them to their calender.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "https://codeforces.com/", text: "Codeforces" ,image:img1},
  { href: "https://leetcode.com/problemset/", text: "Leetcode", image:img2},
  { href: "https://www.geeksforgeeks.org/", text: "Geeks for Geeks" ,image:img3},
  { href: "https://atcoder.jp/", text: "Atcoder" ,image:img4},
  { href: "https://www.codechef.com/dashboard", text: "Codechef",image:img5 },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
