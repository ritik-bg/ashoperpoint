import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../Store/api/authApi';
import { loginSuccess } from '../../Slices/auth/AuthSlice';

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const handlelogin = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      // console.log(res,'res');

      if (res?.success) {
        dispatch(loginSuccess(res?.data));
        toast.success(res.message || "Unable to login!");
        navigate("/");
      } else {
        toast.error(res.message || res?.message || "Unable to login!");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      toast.error(error.message || "Unexpected error occurred!");
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
        }} className='flex flex-col gap-10 mt-5 md:w-auto  w-[80%]'>
          <div className="form-group ">
            <input className='bg-gray-300 md:w-[20vw] w-[100%] rounded-sm h-[5vh] pl-4' type="text" id="username" name="username" placeholder='Username:' required />
          </div>
          <div className="form-group">
            <input className='bg-gray-300 md:w-[20vw] w-[100%]  rounded-sm h-[5vh] pl-4' type="password" id="password" name="password" placeholder='Password' required />
          </div>
          <button disabled={isLoading} className='bg-yellow-400 rounded-full h-[5vh] flex justify-center align-middle items-center tex-white ' type="submit" > {isLoading && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )}
  {isLoading ? null : 'Submit'}</button>
        </form>  </div>
    </div>
  )
}

export default SignIn
