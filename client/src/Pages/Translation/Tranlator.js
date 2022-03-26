import { Form, Formik, Field } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import ForumService from '../../Services/forum.service';
import { motion } from "framer-motion";
import axios from 'axios';

const QuestionSchema = Yup.object().shape({
    q: Yup.string().required('This field is required'),
});
  

function Tranlator() {

    const [disabled, setDisabled] = useState(false)

    const makeTranslation = (data) => {
        var options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'x-rapidapi-key': 'f60f05c79cmsha12c0e7a5fd7e41p18ca8bjsne58ad0da1c10',
              'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
            },
            data: data
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }
  return (
    <div>
        <Formik
        initialValues={{
            q: '',
            source: '',
            target: '',
        }}
        validationSchema={QuestionSchema}
        onSubmit={values => makeTranslation(values)}
        >
            <Form>

            <Field
                  id="text"
                  name="q"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-20"
                  placeholder="Text"
                />

            <Field as="select" name="source"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
             <option value="en">Arabic</option>
             <option value="fr">French</option>
             <option value="en">English</option>
           </Field>

           <Field as="select" name="target"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
             <option value="en">Arabic</option>
             <option value="fr">French</option>
             <option value="en">English</option>
           </Field>

           <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={disabled}
              >
                            {
                    disabled ?
                    <span>Processing ...</span>
                    :
                    <span>Translate</span>
                    }
              </button>
            </Form>
        </Formik>
    </div>
  )
}

export default Tranlator