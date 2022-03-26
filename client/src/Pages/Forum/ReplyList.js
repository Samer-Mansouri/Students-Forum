import React, { useEffect, useState } from 'react'
import ForumService from '../../Services/forum.service';
import { CheckIcon } from '@heroicons/react/outline'

function ReplyList(props) {
    

    
    const { id, is_owner } = props

    const [replies, setReplies] = useState([])
    
    const verifyReply = (reply_id) => {
        const data = {
            quest_id: id,
            reply_id: reply_id
        }
        ForumService.verifyReplyOnComment(data)
        .then((res) => {
            console.log(res)
            window.location.reload(false)

        })
        .catch((err) => console.log(err))
    }

    const fetchData = (id) => {
        ForumService.getQuestionReplies(id)
        .then((data) => {
          console.log(data.data)
          setReplies(data.data)
        })
        .catch(error => {
          console.log(error)
        })
      }

      useEffect(() => {
          fetchData(id)
      }, [])

    
    if(replies.length > 0){
        return (

            <div className="bg-white border rounded shadow-lg mt-5 pb-4 lg:ml-20 lg:mr-20 md:ml-10 lg:mr-10">
                <div className="mb-3 mt-4 ml-2">Replies List</div>
                {
                    replies.map((reply, index) => (
                        <div key={index} className="border pt-1 pb-1 pl-3 mb-2 mr-4 ml-4">
                            <h5 className="mt-2 text-lg font-large text-black-700">
                            <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white mr-2"
                        src={`http://127.0.0.1:8000${reply.user_profile_pic}`}
                        alt=""
                            />
                                {reply.username}</h5>
                            {
                                reply.is_verified ?
                                <p className="ml-10 text-green-500">Verified</p>
                                : ''
                            }
                            <p className="ml-10">{reply.reply}</p>

                            {
                                    !reply.is_verified && is_owner ?
                                    <button onClick={() => verifyReply(reply.id)} className="mt-2 ml-4 mb-3 group relative flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-100 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    ><CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" /></button>
                                    :
                                    ''
                                }
                        </div>
                    ))}
                </div>
      )
    } else {
        return(
            <div className="bg-white border rounded shadow-lg mt-5  lg:ml-20 lg:mr-20 md:ml-10 lg:mr-10">
                    <h2 className="text-gray-500 text-center pt-4 pb-4">No replies for this question</h2>
                </div>
        )
    }

    
}

export default ReplyList