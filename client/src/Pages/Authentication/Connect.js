import { LockClosedIcon } from '@heroicons/react/solid'
import { Formik, Form, Field } from 'formik';
import AuthService from '../../Services/auth.service';
import * as Yup from 'yup';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});


function Connect() {

  const [disabled, setDisabled] = useState(false)

  const [login, setLogin] = useState(false);

  const sendData = (data) => {
    setDisabled(true)
    AuthService.login(data)
    .then(() => {
      setLogin(true)
      window.location.reload(false)
      console.log("Success")
      setDisabled(false)
    })
    .catch(error => console.log(error))
  }

      
  if(login){
    return <Redirect to="/" />
  } else {
    return (
        
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
        <span>Sign in</span>
      }
            </button>
          </div>
        </Form>)}
      </Formik>
    
    )
  }
}

export default Connect