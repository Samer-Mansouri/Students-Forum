import React, { useEffect, useState } from 'react'
import ForumService from '../../Services/forum.service';
import AskQuestion from './AskQuestion';
import DisplayQuestion from './DisplayQuestion';

function Forum() {

  const [questions, setQuestions] = useState([])
  const fetchData = () => {
    ForumService.getForum()
    .then((data) => {
      console.log(data.data)
      setQuestions(data.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log("Hi")
    fetchData();
  }, [])

  

  return (
    <>
    <AskQuestion />
    <DisplayQuestion questions={questions}/>
    </>
   
  )
}

export default Forum