import React from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Formik, Form, Field } from 'formik';
import AuthService from '../../Services/auth.service';
import * as Yup from 'yup';
import { useState } from 'react';
import SuccessAlert from './SuccessAlert';
import DangerAlert from './DangerAlert';
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
      duration: 0.8,
      ease: easing
    }
  }
};

const SignInSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email('Invalid email').required('Email field is required'),
    password: Yup.string().required('Password field is required'),
    password2: Yup.string().required("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
    )}),

});


function Signup() {

    const [disabled, setDisabled] = useState(false)
    const [created, setCreated] = useState(false)
    const [verifErr, setVerifErr] = useState("")
    const [newErr, setNewErr] = useState(false)

  const sendData = (data) => {
    setDisabled(true)
    AuthService.register(data)
    .then((res) => {
      console.log(res.data);
      if(res.data.email || res.data.username){
        setNewErr(true)
        setDisabled(false)
        setVerifErr(res.data)
      } else {
        console.log("Success")
        setCreated(true)
        setDisabled(false)
      }

      
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <motion.div animate={fadeInUp.animate}
          initial={fadeInUp.initial} className="min-h-full mt-20 p-10  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              
              <p  className="font-medium text-indigo-600 hover:text-indigo-500">
                start leaving an unbelievable experience
              </p>
            </p>
          </div>
          <Formik
        initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={values => sendData(values)}
        >
           {({ errors, touched }) => ( 
           <Form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="email-address" className="sr-only">
                  First Name
                </label>
                <Field
                  id="first-name"
                  name="first_name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Last Name
                </label>
                <Field
                  id="last-name"
                  name="last_name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
        
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Field
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirmpass" className="sr-only">
                  Confirm Password
                </label>
                <Field
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            



            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={disabled}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                <svg className="animate-spin h-5 w-5 mr-3 text-white ..." viewBox="0 0 24 24">
        </svg>
        {
          disabled ?
          <span>Processing ...</span>
          :
          <span>Sign up</span>
        }
              </button>
            </div>
          </Form>)}
        </Formik>

         {
             created ?
             <SuccessAlert title="Account Created Successfully" />
             :
             ''
         }
          {
            newErr ?
            <DangerAlert error={verifErr} />
            :
            ''
          }
      
        </div>
      </motion.div>
  )
}

export default Signup