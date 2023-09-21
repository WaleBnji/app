import React, { useState } from 'react';
import { database } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const RegisterAndLogin = () => {
  const [login, setLogin] = useState(false);
  const history = useNavigate();
  const submitHandler = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === 'signup') {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          history('/home');
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          history('/home');
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };
  return (
    <div className='p-10 '>
      <div className='card rounded-md py-12 px-4 bg-white md:w-[550px] lg:w-[650px]'>
        <h1 className='font-bold text-[1.5rem] text-center'>
          {login ? 'SignIn' : 'SignUp'}
        </h1>
        <form
          action=''
          onSubmit={(e) => submitHandler(e, login ? 'signin' : 'signup')}
          className='m-6'
        >
          <div className='mb-4'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              className='border-b p-2 md:block md:w-full'
              placeholder='walebnji@gmail.com'
            />
            <br />
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Password:</label>

            <input
              type='password'
              name='password'
              className='border-b p-2 md:block md:w-full '
              placeholder='******'
            />
            <br />
          </div>
          <button className='border block w-full rounded-lg mt-8 button text-white py-2'>
            {login ? 'SignIn' : 'SignUp'}
          </button>
        </form>

        <div className=' mt-28 text-center w-full text-[0.9rem] font-semibold'>
          <h3 className=''>Already have an account?</h3>
          <button
            className='w-full'
            onClick={() => {
              setLogin(true);
              console.log(login);
            }}
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterAndLogin;
