import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import './Login.css'
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();


  const [form, setForm] = useState([{
    name: '',
    email: '',
    password: ''
  }])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const onSubmit = async(data) => {

    const res = await fetch('http://localhost:3000/register' , {
      method: 'POST',
      headers:{
        'content-type':'application/json'
      }
      ,
      body : JSON.stringify(data)
     })
     
    const responseData = await res.json();
    console.log("Response Data:", responseData);

    // ✅ Reset form only after successful submission
    setForm({
      name: "",
      email: "",
      password: "",
    });


  

  };
  return (
    <div className="signup w-full h-[90vh] flex justify-center bg-gradient-to-b from-pink-200 to-pink-50 items-center">
      <div className="signup-box w-[30vw] h-[60vh] p-4 bg-white flex flex-col gap-3 rounded-md ">
        <h1 className='text-2xl font-semibold font-sans text-center'>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs mx-auto flex flex-col gap-2">

            <div>
              <input type="text" placeholder='Your Name' value={form.name} onChange={handleChange}  {...register('name', { required: 'Name is required'  })} />
              {errors.name && <p className='text-red-600 text-sm '>   {errors.name.message}</p>}

            </div>
            <div>

              <input
                type="email" placeholder='Your Email' value={form.email} onChange={handleChange}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className='text-red-600 text-sm '>{errors.email.message}</p>}
            </div>
            <div>

              <input
                type="password" placeholder='Password' value={form.password} onChange={handleChange}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />

              {errors.password && <p className='text-red-600 text-sm '>{errors.password.message}</p>}
            </div></div>
          <button className='text-center signup-btn' type="submit" onSubmit={onsubmit}>Sign Up</button>



          <p className='text-sm font-small text-slate-500 pt-3'>Already Have An Account <Link className='text-customRed' to='/Login'>Login Here</Link> </p>

          <label className='text-sm font-sm  text-slate-500 leading-tight '>
            <input className='mr-1' type="checkbox" name="privacyPolicy" />
            By continuing, I agree to the Terms of Use and Privacy Policy
          </label>





        </form>



      </div>

    </div>
  )
}

export default LoginSignup
