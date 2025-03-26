import React from 'react'

import { useEffect } from 'react'



const handlecookies = () => {

  fetch("http://localhost:3000/signin", {
    method: "POST",
    credentials: "include", // ✅ Required to send/receive cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "ritik", password: "12345" }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Login successful:", data))
    .catch((err) => console.error("Error:", err));

}


const getreq = () => {
  fetch("http://localhost:3000/protected", {
    method: "GET",
    credentials: "include", // ✅ Cookie will be sent automatically
  })
    .then((res) => res.json())
    .then((data) => console.log("Protected Data:", data))

    .catch((err) => console.error("Error:", err));
}





const SignIn = () => {


  return (
    <div>
      <div className="form flex flex-col justify-center items-center mt-20 mb-10">
        <h2 className='font-bold text-3xl'>Login</h2>

        <form action="http://localhost:3000/signin" method='POST' className='flex flex-col gap-10 mt-5'>
          <div className="form-group ">

            <input className='bg-gray-300 w-[20vw] rounded-sm h-[5vh] pl-4' type="text" id="username" name="username" placeholder='Username:' required />
          </div>

          <div className="form-group">

            <input className='bg-gray-300 w-[20vw] rounded-sm h-[5vh] pl-4' type="password" id="password" name="password" placeholder='Password' required />
          </div>
          <button className='bg-green-400 rounded-full h-[5vh]' type="submit" onSubmit={handlecookies}>Submit</button>
        </form>  </div>

    </div>
  )
}

export default SignIn
