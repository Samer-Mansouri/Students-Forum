import React, { useState, useEffect } from 'react'
import './App.css'
import { motion } from "framer-motion";
let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easing
    }
  }
};

const fadeInLeft = {
    initial: {
      x: -100,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2.0,
        ease: easing
      }
    }
  };

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function VoiceDetector() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <div>
        <motion.div animate={fadeInLeft.animate}
              initial={fadeInLeft.initial}>
          <h1 className="text-center mt-6 mb-6 text-indigo-600 text-3xl">Voice Notes</h1>
          </motion.div>
      <div className="grid grid-cols-2 gap-20 ml-10">
        <motion.div animate={fadeInUp.animate}
              initial={fadeInUp.initial} className="overflow-auto border rounded shadow-xl pt-3 pb-3 pl-4 pr-4 " style={{height:"400px"}}>
          <h2 className="text-white rounded shadow bg-indigo-600 pt-3 pb-3 pl-2 mb-4">Current Note</h2>
          <div className="mb-4">
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note} className="group relative  ml-2 mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)} className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Start/Stop
          </button>
          </div>
          <p>{note}</p>
        </motion.div>
        <motion.div animate={fadeInUp.animate}
              initial={fadeInUp.initial} className="overflow-auto border shadow-xl rounded mr-10 pt-3 pb-3 pl-4 pr-4">
          <h2 className="text-white rounded shadow bg-indigo-600 pt-3 pb-3 pl-2 mb-4">Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default VoiceDetector