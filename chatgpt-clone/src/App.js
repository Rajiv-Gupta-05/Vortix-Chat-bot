import { useState , useEffect } from "react"
import React, { useRef } from 'react'
import { LightModeRounded } from "@mui/icons-material";
import { DarkModeRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";


const App = () => {
  const [value, setValue] =useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrntTitle] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [showBot, setShowBot] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrntTitle(null)
    setShowBot(true);
  }


  const handleClick = (uniqueTitle) => {
    setCurrntTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }


  const getMessages = async () => {
    setShowBot(false);
    setIsLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }
    try{
      const response = await fetch('http://localhost:7000/completions', options)
      const data =await response.json()
      // console.log(data);
      setMessage(data.choices[0].message)
      setIsLoading(false);
    }catch(error){
      console.error(error)
    }
  }


  useEffect(()=>{
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrntTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(previousChats => (
        [...previousChats,
          {
            title: currentTitle,
            role: "user",
            content: value
          }, 
          {
            title:currentTitle, 
            role:message.role,
             content:message.content
          } 
        ]
      ))
    }
  },[message, currentTitle])
  console.log(previousChats);

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles);


    const chatContainerRef = useRef(null);
    useEffect(() => {
      scrollToBottom();
    }, [currentChat]);
    const scrollToBottom = () => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleRefresh = () => {
      window.location.reload();
    };

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };

  return (
      <div className="app">   
      
      <section className="side-bar">
        <button onClick={createNewChat}><i className="fa-solid fa-plus"></i>&nbsp; New Chat &nbsp;<i className="fa-solid fa-message"></i></button>
        <ul className="history"> <p><i className="fa-solid fa-clock-rotate-left"></i> &nbsp; Previous Chats History:</p>
          {uniqueTitles?.map((uniqueTitle, index) => 
          <li key={index} onClick={() => handleClick(uniqueTitle)}> 
            <i className="fa-solid fa-comments"></i> &nbsp; {capitalizeFirstLetter(uniqueTitle)}
          </li>)}
        </ul>
        <div className="container">
         <img className="circle-image" src="/images/profile.jpg" alt="" />
         <div className="text">Rajiv Gupta
           <a className={`link ${isDropdownVisible ? 'active' : ''}`} onClick={toggleDropdown}><i className="fa-solid fa-ellipsis"></i></a>
           {isDropdownVisible && (
           <div className="dropdown-menu">
            <ul className="dot">
              <p><i className="fa-solid fa-gear"></i>&nbsp; Settings</p>
              <p><i className="fa-solid fa-circle-question"></i>&nbsp; Help & FAQ</p>
              <p onClick={handleRefresh}><i className="fa-solid fa-trash-can"></i>&nbsp; Clear conversation</p>
            </ul>
          </div>
         )}
         </div>
       </div>
      </section>

      <section className={`main ${isDarkMode ? 'dark-mode' : 'light-mode'}`} >
        {!currentTitle && <h1>voRtekAI</h1>}
         
         <div class="status">
           <span class="online-indicator"></span>
             <p className="online-text">Active</p>
         </div>
         
         {/* <div className="toggle-container">
           <input onClick={toggleDarkMode} className="toggle-checkbox" type="checkbox" id="toggle">
           </input>
           <label className="toggle-label" for="toggle"></label>
         </div> */}

          <Tooltip arrow title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <div onClick={toggleDarkMode} className="toggle-container">
              {isDarkMode ? <DarkModeRounded /> : <LightModeRounded />}
           </div>
         </Tooltip>
         
        
        {showBot && <div className="bot">
          <img src="/images/bot2.gif" alt="" />
        </div>}
        <ul ref={chatContainerRef} className="feed" >
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
       )}
        <div className="bottom-section">
          <div className="input-container">
            <input 
             type="text"
             placeholder="Don't hesitate to ask anything—I'm here to help!"  
             value={value} 
             onChange={(e)=> setValue(e.target.value)}
             />
        
            <div id="submit" onClick={getMessages} className="tooltip">
               <i className="fa-solid fa-circle-arrow-right fa-beat-fade"></i> 
               <span class="tooltiptext">Click to send your message</span>
             </div>
          </div>
          <p className="info">
            Free Research Preview. voRtekAI may produce inaccurate information about people, places, or facts. voRtekAI version 1.0.1
          </p>
        </div>
      </section>

    </div>
 
  )
}

export default App;
