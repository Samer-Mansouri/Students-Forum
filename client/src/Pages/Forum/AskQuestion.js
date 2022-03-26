import { Form, Formik, Field } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import ForumService from '../../Services/forum.service';
import { motion } from "framer-motion";
import SuccessAlert from '../Authentication/SuccessAlert';

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInBottom = {
    initial: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.0,
        ease: easing
      }
    }
  };


const QuestionSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    question: Yup.string().required('This field is required'),
  });
  
  
function AskQuestion() {

    const [disabled, setDisabled] = useState(false)
    const [created, setCreated] = useState(false)


    const sendData = (data) => {
      setDisabled(true)
        ForumService.createQuestion(data)
        .then((res) => {
          setDisabled(false)
          setCreated(true)
          window.location.reload(false);
        })
        .then((err) => console.log(err))
    }
  return (
    <motion.div animate={fadeInBottom.animate}
    initial={fadeInBottom.initial} className="max-w-2xl mx-auto mt-3 mb-8 sm:px-6 lg:max-w-7xl border shadow-lg pb-3">
        <Formik
            initialValues={{
                title: '',
                question: '',
            }}
            validationSchema={QuestionSchema}
            onSubmit={values => sendData(values)}
            
        >
            {({ errors, touched }) => (<Form className="mt-8 space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <Field
                  id="email-address"
                  name="title"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                />
              </div>

              <div>
                <label htmlFor="question" className="sr-only">
                  Question
                </label>
                <Field
                  id="question"
                  name="question"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-20"
                  placeholder="Question"
                />
              </div>

              <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={disabled}
              >
                            {
                    disabled ?
                    <span>Processing ...</span>
                    :
                    <span>Ask question</span>
                    }
              </button>
            </div>
            </Form>)}
        </Formik>

        {
             created ?
             <SuccessAlert title="Question Added Successfully" />
             :
             ''
         }
    </motion.div>
  )
}

export default AskQuestion