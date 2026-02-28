import { yupResolver } from '@hookform/resolvers/yup';
import chroma from 'chroma-js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { StylesConfig } from 'react-select';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import { useGetAllRoleQuery } from '../../API/userAPI/userApi';
import { setToken, setUserId } from '../../store/Slice/TokenSlice';
// Yup Validation Schema
const schema = yup.object().shape({
  Name: yup.string().required('First Name is required').min(2, 'Too short'),
  lastName: yup.string().required('Last Name is required').min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().required('Age is required').min(13, 'You must be at least 13'),
Mobile: yup.string().required('Mobile is required').matches(/^\d{10}$/, 'Mobile must be 10 digits'),
  role: yup.object().shape({
    label: yup.string().required('Role is required'),
    value: yup.string().required('Role is required'),
  }),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'),], 'Passwords must match')
    .required('Confirm your password'),
  terms: yup.bool().oneOf([true], 'You must accept the terms'),
});

export default function RegisterForm() {
    const navigate = useNavigate();
      const dispatch = useDispatch();
  const token = useSelector((state:any) => state?.tokenSlice.token);
  const {
    register,
    handleSubmit,
    formState: { errors },

    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });



 const { data: userRoleTypeData } = useGetAllRoleQuery();

  console.log('Token from Redux:', token);
 const apiUrl = import.meta.env.VITE_API_URL;
  const onSubmit = async(data:any) => {



    const payload = {
      ...data,
      role:data?.role?._id
    }
    console.log('Registration Data:', payload, apiUrl);
   try {
      const response = await fetch(`${apiUrl}/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if(responseData?.message == "success") {
        toast.success('login successful!');
            console.log('Token:', responseData?.data);
                          dispatch(setToken(responseData?.data?.token));
                          dispatch(setUserId(responseData?.data?._id));
                     
                          localStorage.setItem('token', responseData?.data?.token);
                          localStorage.setItem('userId', responseData?.data?._id);
            setTimeout(() => {
    navigate('/login');
  }, 100); // short delay to ensure state update
        
    // reset();

      }else{
        toast.error('Registration failed. Please try again.'+ responseData?.message ? ` ${responseData.message}` : '');
      }

    } catch (error) {
      console.error('Error posting data:', error);
        toast.error('Registration failed. Please try again.');
    }





  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-8 rounded-lg shadow-md w-full max-w-md bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Register</h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">First Name</label>
          <input
            type="text"
            {...register('Name')}
            className={`w-full px-4 py-2 border rounded ${
              errors.Name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className={`w-full px-4 py-2 border rounded ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Age</label>
          <input
            type="number"
            {...register('age')}
            className={`w-full px-4 py-2 border rounded ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

          {/* Mobile */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Mobile</label>
          <input
            type="number"
            {...register('Mobile')}
            className={`w-full px-4 py-2 border rounded ${
              errors.Mobile ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.Mobile && <p className="text-red-500 text-sm">{errors.Mobile.message}</p>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Role</label>
          <Select
            options={(userRoleTypeData as any)?.data}
            onChange={(selectedOption) => {
              // @ts-ignore
              setValue('role', selectedOption);
            }}
            classNamePrefix={errors.role ? 'border-red-500' : 'border-gray-300'}
            name="role"
            styles={colourStyles}
            // isMulti={false}/
            isClearable
          />
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>
        {/* <div className="mb-4">
          <label className="block mb-1 text-gray-100">Role</label>
          <select
            {...register('role')}
            className={`w-full px-4 py-2 border rounded ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value={{label:"",value:""}}>Select Role</option>
            <option value={{ label: "Admin", value: "Admin" }}>Admin</option>
            <option value={{ label: "User", value: "User" }}>User</option>
            <option value={{ label: "Guest", value: "Guest" }}>Guest</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div> */}

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-4 py-2 border rounded ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-100">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`w-full px-4 py-2 border rounded ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="mb-6 flex items-center">
          <input type="checkbox" {...register('terms')} className="mr-2" />
          <label className="text-gray-100 text-sm">
            I accept the <span className="underline">terms and conditions</span>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm mb-4">{errors.terms.message}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
           <ToastContainer />
    </div>
  );
}
type ColourOption = {
  value: string;
  label: string;
  color: string;
};

export const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'black' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma("red");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "black"
        : isFocused
        ? color.alpha(0.5).css()
        : undefined,
      color: isDisabled
        ? 'pink'
        : isSelected
        ? chroma.contrast(color, 'black') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? "black"
            : color.alpha(0.5).css()
          : undefined,
      },
    };
  },
  multiValue: (styles) => {
    const color = chroma("black");
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: "black",
      color: 'white',
    },
  }),
};
