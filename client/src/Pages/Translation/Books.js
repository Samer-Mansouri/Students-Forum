import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SearchIcon } from '@heroicons/react/outline'
import SingleBook from './SingleBook';
import { motion } from "framer-motion";
import Loader from '../../Layouts/Loader';
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

const fadeInRight = {
    initial: {
      x: 100,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.8,
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
  

const SearchSchema = Yup.object().shape({
  title: Yup.string().required('This field is required'),
});

function Books() {

const [disabled, setDisabled] = useState(false);

const [books, setBooks] = useState([])

const execute = (title) => {
    
    setDisabled(true)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyAeei6KPgwWyLhk8TSn5I0AE9wlSiCjKFI`)
    .then(res =>{
      console.log(res.data.items)
      setBooks(res.data.items)
      setDisabled(false)
    })
    .then(err => {
      console.log(err)
      setDisabled(false)
    })
   
  }
  

  return (
    <>
          <motion.div
          animate={fadeInRight.animate}
          initial={fadeInRight.initial}
          className="mt-20"
          >
          <h1 className="text-center mt-6 mb-6 text-indigo-600 text-3xl">Search for a book</h1>
          </motion.div>
        <motion.div
        animate={fadeInUp.animate}
        initial={fadeInUp.initial}
        >
        <Formik
        initialValues={{
          title: '',
      }}
      validationSchema={SearchSchema}
      onSubmit={values => execute(values)}
        >
          <Form className="flex flex-wrap justify-center items-center">
            
          <Field
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="w-1/3 appearance-none mr-2 rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Book title"
                />

              <button
                type="submit"
                className="group relative w-20 flex justify-center pt-1.5 pb-1.5 px-4 w-1/12 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={disabled}
              >
                            {
                    disabled ?
                    <span>Processing ...</span>
                    :
                    <span><SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    }
              </button>
          </Form>
        </Formik>
        </motion.div>

        <SingleBook books={books}/> 
        {
          disabled ?
''          : ''
        }
    </>
  )
}

export default Books