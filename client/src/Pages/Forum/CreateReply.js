import { Form, Formik, Field } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import ForumService from '../../Services/forum.service';



const ReplySchema = Yup.object().shape({
    reply: Yup.string().required('This field is required'),
  });
  
  
function CreateReply(props) {

    const [disabled, setDisabled] = useState(false)
    const { post_id } = props;
    const sendData = (data) => {
        ForumService.createReplyOnQuestion(data, post_id)
        .then((res) => console.log(res))
        .then((err) => console.log(err))
    }
  return (
    <div className="border shadow pt-2 pb-2  mx-auto mt-5 mb-5 sm:px-6 lg:max-w-7xl lg:ml-20 lg:mr-20">
        <Formik
            initialValues={{
                reply: '',
            }}
            validationSchema={ReplySchema}
            onSubmit={values => sendData(values)}
            
        >
            {({ errors, touched }) => (<Form  action="#" method="POST">
            <div>
                  
                <Field
                  id="reply"
                  name="reply"
                  type="text"
                  required
                  className="appearance-none w-full rounded-none mr-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Reply"
                />
              </div>

              
              <div>
             <div className="flex justify-end">
             <button
                type="submit"
                className=" py-2 px-4 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={disabled}
              >
                            {
                    disabled ?
                    <span>Processing ...</span>
                    :
                    <span>Reply</span>
                    }
              </button>
             </div>
            </div>
            </Form>)}
        </Formik>
    </div>
  )
}

export default CreateReply