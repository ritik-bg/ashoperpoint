import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Slices/auth/AuthThunk';
import { toast } from 'react-toastify';

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async (data) => {
    try {
      const status = await dispatch(loginUser(data));
      if (status) {
        navigate("/");
      } else {
        toast.error("Unable to login!");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      toast.error("Unexpected error occurred!");
    }
  };

  return (
    <div>
      <div className="form flex flex-col justify-center items-center mt-20 mb-10">
        <h2 className='font-bold text-3xl'>Login</h2>

        <form onSubmit={(e) => {
          e.preventDefault()
          const username = e.target.username.value;
          const password = e.target.password.value;
          const data = {
            username, password
          }
          handlelogin(data)
        }} className='flex flex-col gap-10 mt-5'>
          <div className="form-group ">
            <input className='bg-gray-300 w-[20vw] rounded-sm h-[5vh] pl-4' type="text" id="username" name="username" placeholder='Username:' required />
          </div>
          <div className="form-group">
            <input className='bg-gray-300 w-[20vw] rounded-sm h-[5vh] pl-4' type="password" id="password" name="password" placeholder='Password' required />
          </div>
          <button className='bg-green-400 rounded-full h-[5vh]' type="submit" >Submit</button>
        </form>  </div>
    </div>
  )
}

export default SignIn
