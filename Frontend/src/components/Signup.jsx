import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthProvider";
import axios from 'axios';
import {Link} from "react-router-dom"

export const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState('');

  const validatePasswordMatch = (value) =>
    value === watch('password') || 'Passwords do not match';

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post("https://chatapp-nnoo.onrender.com/user/signup", userInfo,  { withCredentials: true });
      console.log(response.data);
      if(response.data){
      alert("Signup successful");
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 text-white border border-white px-6 py-6 rounded-md space-y-4 w-96 shadow-lg"
      >
        <h1 className="text-2xl text-center">
          Chat<span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-xl text-center font-bold">Signup</h2>

        {/* Fullname */}
        <div>
          <div className="input input-bordered flex items-center gap-2 bg-gray-800">
            <input
              type="text"
              className="grow bg-transparent text-white"
              placeholder="Fullname"
              {...register('fullname', { required: 'This field is required' })}
            />
          </div>
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.fullname.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="input input-bordered flex items-center gap-2 bg-gray-800">
            <input
              type="email"
              className="grow bg-transparent text-white"
              placeholder="Email"
              {...register('email', { required: 'This field is required' })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="input input-bordered flex items-center gap-2 bg-gray-800">
            <input
              type="password"
              className="grow bg-transparent text-white"
              placeholder="Password"
              {...register('password', { required: 'This field is required' })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="input input-bordered flex items-center gap-2 bg-gray-800">
            <input
              type="password"
              className="grow bg-transparent text-white"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: validatePasswordMatch,
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-sm font-semibold text-center">
            {serverError}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Have an account?
            <Link to='/login' className="text-blue-500 underline cursor-pointer ml-1">
              Login
            </Link>
          </p>
          <input
            type="submit"
            value="Signup"
            className="text-white bg-green-500 px-4 py-1 rounded-md cursor-pointer hover:bg-green-600"
          />
        </div>
      </form>
    </div>
  );
};
