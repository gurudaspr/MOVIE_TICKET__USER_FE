import React, { useState } from 'react'
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl/baseUrl';
import toast from 'react-hot-toast';



const userSchema = yup.object({
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password')
});

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(userSchema),
    })
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post(`${baseUrl}/api/user/signin`, data, { withCredentials: true, },);
            toast.success(res.data.message);
            navigate("/userHome");
            setLoading(false);
        } catch (error) {
            toast.error('Invalid Credentials');
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-base-200 shadow-lg rounded-lg p-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-dark mb-4"><span className='text-primary'>FilmGo</span> Login</h1>
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

                        <input type="password" placeholder="Password" className="input input-bordered input-primary w-72"
                            {...register("password")} />
                        {errors.password && (
                            <span className="text-error block text-sm mt-1 ml-2">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="my-3">
                        <button className="btn btn-primary w-72"disabled={loading}>{loading ? <span className='loading loading-spinner bg-primary '></span> : "Login"}</button>
                    </div>
                    <Link to="/signup" className="text-right w-72  hover:underline">
                        Don't have an account?
                    </Link>
                                
                </form>

            </div>
        </div>

    )
}

