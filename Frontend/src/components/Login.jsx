import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider";
import {Link} from "react-router-dom"

export const Login = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("https://chatapp-nnoo.onrender.com/user/login", userInfo, { withCredentials: true });
      console.log(response.data);
      alert("Login successful");
      localStorage.setItem("ChatApp", JSON.stringify(response.data)); 
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 text-white border border-white px-6 py-6 rounded-md space-y-4 w-96 shadow-lg">
        <h1 className="text-2xl text-center">
          Chat<span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-xl text-center font-bold">Login</h2>

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2 bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.685a.75.75 0 0 0 .652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954l-6.022 2.906a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow bg-transparent text-white"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">This field is required</span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2 bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            type="password"
            className="grow bg-transparent text-white"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">This field is required</span>
        )}

        {/* Submit */}
        <div className="flex justify-between items-center">
          <p className="text-sm">
            New user?
            <Link to='/signup' className='text-blue-500 underline cursor-pointer ml-1'>
              Signup
            </Link>
          </p>
          <input
            type="submit"
            value="Login"
            className="text-white bg-green-500 px-4 py-1 rounded-md cursor-pointer hover:bg-green-600"
          />
        </div>
      </form>
    </div>
  );
};
