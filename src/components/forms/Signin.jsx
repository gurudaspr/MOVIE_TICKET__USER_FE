import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const userSchema = yup.object({
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters long'),
});

export default function Signin() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(userSchema),
    })
    const onSubmit = async (data) => {
        try {
          const res =  await axios.post( "http://localhost:5000/api/user/signin", data, { withCredentials: true, }, );
            navigate("/movies");
        } catch (error) {
            console.log(error); 
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-base-200 shadow-lg rounded-lg p-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-dark mb-4"><span className='text-primary'>FilmGo</span> Signin</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    
                    <div className="my-3">

                        <input type="email" placeholder="Email" className="input input-bordered input-primary w-72 "
                            {...register("email")} />
                        {errors.email && (
                            <span className="text-error block text-sm  mt-1 ml-2">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="my-3">

                        <input type="text" placeholder="Password" className="input input-bordered input-primary w-72"
                            {...register("password")} />
                        {errors.password && (
                            <span className="text-error block text-sm mt-1 ml-2">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="my-3">
                        <button className="btn btn-primary w-72">Signup</button>
                    </div>
                    <Link to="/signup" className="text-right w-72  hover:underline">
                        Don't have an account?
                    </Link>

                </form>

            </div>
        </div>

    )
}

