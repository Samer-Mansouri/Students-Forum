import React, { useState } from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import FadeIn from 'react-fade-in';


function Bot() {
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = e => {
        e.preventDefault();
        if (isClicked){
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
        
    }

    

    return (
        <div className="fixed bottom-0 right-0 p-3">
        <button className="pt-4 pb-4 pr-4 pl-4 chatButt" 
        style={{borderRadius:"100px"}} 
        onClick={handleClick}>{
            isClicked ? <i className="fas fa-times fa-2x"></i> : <i className="fas fa-robot fa-2x"></i>}</button>
        {
        isClicked ? <FadeIn transitionDuration="1000"><Chatbot messageParser={MessageParser} actionProvider={ActionProvider} config={config} /></FadeIn> : ''
        }

        
        </div> 
    )
}

export default Bot