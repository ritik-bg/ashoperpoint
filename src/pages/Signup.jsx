import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Baseurl } from '../api.config';
import { useGetOtpMutation, useRegisterMutation } from '../Store/api/authApi';

const SignupPage = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [genrateOtp] = useGetOtpMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    reset,
    resetField,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    if (!data.name || !data?.email || data?.otp || data?.password)
      return toast.error('all field are required');
    try {
      const res = await registerUser(data).unwrap();
      if (res.success) {
        toast.success(res?.message || 'user Created SuccessFully!');
        reset();
        navigate('/');
      } else {
        toast.error(res?.message || 'Unable To Add User');
      }
    } catch (error) {
      console.error(error || 'Something Went Wrong!');
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    const isValid = await trigger('email');

    if (!isValid) return toast.error('Please enter a valid email!');
    const email = getValues('email');
    try {
      const responseData = await genrateOtp({ email: email }).unwrap();
      if (responseData.success) {
        toast.success(responseData?.message || 'OTP sent to your email');
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
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
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
                {...register('otp', {
                  required: 'otp is required',
                  minLength: {
                    value: 6,
                    message: 'otp must be at least 6 characters',
                  },
                })}
              />

              {errors.otp && <p className="text-red-600 text-sm ">{errors.otp.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
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
          <div className="flex justify-center">
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

          <label className="text-sm font-sm  text-slate-500 leading-tight flex gap-1 ">
            <input
              {...register('privacyPolicy', { required: 'Accept Policy TO Proceed' })}
              className="mr-1"
              type="checkbox"
              name="privacyPolicy"
            />
            By continuing, I agree to the Terms of Use and Privacy Policy
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
