import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};



const fadeInRight = {
    initial: {
      x: 100,
      opacity: 0,
      transition: { duration: 0.3, ease: easing }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
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
        duration: 0.8,
        ease: easing
      }
    }
  };
function DisplayQuestion(props) {

    const { questions } = props;


    const compareDates = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        return diffDays;
    }
    
    return (
        <div className="bg-white mb-6 sm:ml-10 sm:mr-10">
          <div className="max-w-2xl mx-auto  lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
    
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-1 gap-x-6 lg:grid-cols-1 xl:grid-cols-1 xl:gap-x-8">
              {questions.map((question) => (
                  question.id % 2 == 0 ?

                <motion.div
                animate={fadeInRight.animate}
                initial={fadeInRight.initial}
                whileHover={{
                    scale: 1.1,
                  }}

                 key={question.id}  className="quest group border pt-3 pb-3 pr-4 shadow-lg rounded-lg pl-4">
                  <div className="mb-2 mt-2">
                  
                  <NavLink to={`/profile/${question.user}`}>
                  <h4 className="mt-2 text-lg font-large text-black-700"><img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-2"
                    src={`http://127.0.0.1:8000${question.user_profile_pic}`}
                    alt=""
                        /> {question.username}</h4>
                  </NavLink>
                  </div>
                  <NavLink className="a-hovered mt-4 text-lg font-medium text-gray-900" to={`/question/${question.id}`}>{question.title}</NavLink>

                  <p style={{fontSize:"12px"}} className="text-gray-500">Asked {compareDates(new Date(), new Date(question.created_at))} days ago</p>
                  {question.resolved ? 
    
    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-700 rounded">RESOLVED</span>
      : ''
  }
                  <h3 className="mt-4 text-sm text-gray-700">{question.question}</h3>
                  <p className="mt-2 text-gray-500">Comments: {question.comment_number}</p>
                </motion.div>
                :

                <motion.div
                animate={fadeInLeft.animate}
                initial={fadeInLeft.initial}
                whileHover={{
                    scale: 1.1,
                  }}

                 key={question.id}  className="quest group border pt-3 pb-3 pr-4 shadow-lg rounded-lg pl-4">
                  <div className="mb-2 mt-2">
                  
                  <NavLink to={`/profile/${question.user}`}>
                  <h4 className="mt-2 text-lg font-large text-black-700"><img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-2"
                    src={`http://127.0.0.1:8000${question.user_profile_pic}`}
                    alt=""
                        /> {question.username}</h4>
                  </NavLink>
                  </div>
                  <NavLink className="a-hovered mt-4 text-lg font-medium text-gray-900" to={`/question/${question.id}`}>{question.title}</NavLink>

                  <p style={{fontSize:"12px"}} className="text-gray-500">Asked {compareDates(new Date(), new Date(question.created_at))} days ago</p>
                  {question.resolved ? 
    
                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-green-700 rounded">RESOLVED</span>
                      : ''
                  }
                  <h3 className="mt-4 text-sm text-gray-700">{question.question}</h3>
                  <p className="mt-2 text-gray-500">Comments: {question.comment_number}</p>
                </motion.div>

              ))}
            </div>
          </div>
        </div>
    )
}

export default DisplayQuestion