import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import ForumService from '../../Services/forum.service';
import MakeReply from './MakeReply';
import ReplyList from './ReplyList';


function SingleQuestion() {

    const [question, setQuestion] = useState(false)

    let { id } = useParams()
    
    const fetchData = (id) => {
        ForumService.getQuestionDetails(id)
        .then((data) => {
          console.log(data.data)
          setQuestion(data.data)
        })
        .catch(error => {
          console.log(error)
        })
      }

      const compareDates = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        return diffDays;
    }
    

      useEffect(() => {
          fetchData(id);
      }, [])



  return (
    <div className="mb-10 lg:ml-20 lg:mr-20 lg:pl-20 lg:pr-20">
        <div className="lg:ml-20 lg:mr-20 lg:pl-20 lg:pr-20">
            <div className="bg-white border shadow-lg mt-5 lg:ml-20 lg:mr-20 md:ml-10 lg:mr-10">
    <div className="rounded mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <a key={question.id} href={question.href} className="group">
    <div className="mb-2">
    
    <h4 className="mt-2 text-lg font-large text-black-700"><img
      className="inline-block h-12 w-12 rounded-full ring-2 ring-white mr-2"
      src={`http://127.0.0.1:8000${question.user_profile_pic}`}
      alt=""
          /> <NavLink to={`/profile/${question.user}`}>{question.username}</NavLink></h4>
    </div>
    
    <p className="mt-4 text-lg font-medium text-gray-900">{question.title}</p>
    <p style={{fontSize:"12px"}} className="text-gray-500">Asked {compareDates(new Date(), new Date(question.created_at))} days ago</p>
    {question.resolved == true ? 
    
    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-700 rounded">RESOLVED</span>
      : ''
  }
    <h3 className="mt-4 text-sm text-gray-700">{question.question} </h3>
    <p className="mt-2 text-gray-500">Comments: {question.comment_number}</p>
  </a>
  </div>
  
        
        </div>
        <MakeReply post_id={id}/>
        <ReplyList id={id} is is_owner={question.owner ? question.owner : ''}/>
        </div></div>
  )
}

export default SingleQuestion