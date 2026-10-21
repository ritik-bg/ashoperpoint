import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Baseurl } from '../api.config';

const SignupPage = () => {
  const {
    register,
  handleSubmit,
  getValues,
  trigger,
  reset,
  resetField,
  formState: { errors },
  } = useForm();

  const [form, setForm] = useState([
    {
      name: '',
      email: '',
        otp: '',
      password: '',
    },
  ]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // if(!data.name ||!data?.email || data?.otp || data?.password) return toast.error('all field are required');

    const res = await fetch(`${Baseurl}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log('Response Data:', responseData);
    if(responseData.success){
      toast.success('user Created SuccessFully!')
      setForm({
      name: '',
      email: '',
      password: '',
    });
   navigate('/') 
    }  
  };

  const sendOtp = async (e) => {
  e.preventDefault();

  // validate only the email field
  const isValid = await trigger('email');
  if (!isValid) return toast.error('Please enter a valid email!');

  const email = getValues('email');

  try {
    const res = await fetch('http://localhost:3000/generateOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const responseData = await res.json();
    console.log('Response Data:', responseData);

    if (responseData.success) {
      toast.success('OTP sent to your email');
      // see note below about resetting
    } else {
      toast.error(responseData.message || 'Failed to send OTP');
    }
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong');
  }
};


  return (
    <div className="signup md:w-full h-[90vh] flex justify-center bg-gradient-to-b from-pink-200 to-pink-50 items-center">
      <div className="signup-box md:w-[30vw] h-[60vh] p-4 bg-white flex flex-col gap-3 rounded-md ">
        <h1 className="text-2xl font-semibold font-sans text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs mx-auto flex flex-col gap-2">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-600 text-sm "> {errors.name.message}</p>}
            </div>
            <div>
              <div className='flex gap-2'>
              <input
                type="email"
                placeholder="Your Email"
                // onChange={handleChange}
                {...register('email', { required: 'Email is required' })}
              />
                <button
    type="button"
    className="mx-auto text-center text-nowrap bg-[#ff4141] font-bold rounded-md text-white px-1"
    onClick={sendOtp}
  >
    Get Otp
  </button>
  </div>
              {errors.email && <p className="text-red-600 text-sm ">{errors.email.message}</p>}
            </div>
             <div>
              <input
                type="number"
                placeholder="otp"
                // onChange={handleChange}
                {...register('otp', {
                  required: 'otp is required',
                  minLength: {
                    value: 6,
                    message: 'otp must be at least 6 characters',
                  },
                })}
              />

              {errors.otp && (
                <p className="text-red-600 text-sm ">{errors.otp.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                // onChange={handleChange}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-600 text-sm ">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className='flex justify-center'>
             <button className="mx-auto text-center signup-btn" type="submit" onSubmit={onsubmit}>
            Sign Up
          </button>
          </div>
         

          <p className="text-sm font-small text-slate-500 pt-3">
            Already Have An Account{' '}
            <Link className="text-customRed" to="/Login">
              Login Here
            </Link>{' '}
          </p>

          <label className="text-sm font-sm  text-slate-500 leading-tight ">
            <input className="mr-1" type="checkbox" name="privacyPolicy" />
            By continuing, I agree to the Terms of Use and Privacy Policy
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
