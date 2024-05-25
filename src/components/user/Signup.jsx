import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const userSchema = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')

});

export default function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(userSchema),
    })
    const onSubmit = async (data) => {
        try {
            await axios.post( "api/user/signup", data, { withCredentials: true, }, );
            navigate("/userHome");
        } catch (error) {
            console.log(error); 
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-base-200 shadow-lg rounded-lg p-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-dark mb-4"><span className='text-primary'>FilmGo</span> Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <div className="my-3">

                        <input type="text" placeholder="Name " className="input input-bordered input-primary w-72"
                            {...register("name")} />
                        {errors.name && (
                            <span className="text-error block text-sm mt-1 ml-2">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="my-3">

                        <input type="email" placeholder="Email" className="input input-bordered input-primary w-72 "
                            {...register("email")} />
                        {errors.email && (
                            <span className="text-error block text-sm mt-1 ml-2">
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
                        <input type="text" placeholder="Confirm Password" className="input input-bordered input-primary w-72"
                            {...register("confirmPassword")} />
                        {errors.confirmPassword && (
                            <span className="text-error block  text-sm mt-1 ml-2">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>
                    <div className="my-3">
                        <button className="btn btn-primary w-72">Signup</button>
                    </div>
                    <Link to="/signin" className="text-right w-72  hover:underline">
                        Already have an account?
                    </Link>

                </form>

            </div>
        </div>

    )
}
