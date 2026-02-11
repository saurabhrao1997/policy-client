
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
  import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserId } from '../../store/Slice/TokenSlice';
import { useNavigate } from 'react-router-dom';

// Yup Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function login() {
  const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
      const dispatch = useDispatch();
  const token = useSelector((state:any) => state?.tokenSlice.token);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data:any) => {
    console.log('Login Data:', data, apiUrl);
     try {
      const response = await fetch(`${apiUrl}/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);
         if(responseData?.message == "success") {
              toast.success('Registration successful!');
                 console.log('Token:', responseData?.data);
                 dispatch(setToken(responseData?.data?.token));
                 dispatch(setUserId(responseData?.data?._id));
            
                 localStorage.setItem('token', responseData?.data?.token);
                 localStorage.setItem('userId', responseData?.data?._id);
                      
                 
                 
                 
                 setTimeout(() => {
    navigate('/');
  }, 100); // short delay to ensure state update
              
          // reset();
      
            }else{
              toast.error('Registration failed. Please try again.'+ responseData?.message ? ` ${responseData.message}` : '');
            }

    } catch (error) {
      console.error('Error posting data:', error);
    }


    // add your login logic here
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-400 p-8 rounded-lg shadow-md w-full max-w-sm mt-32 bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-100" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-100" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}

