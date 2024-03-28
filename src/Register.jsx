import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { axiosClient } from './axios';
export default function Register() {
    // TODO: Password state
    const [password, setPassword] = useState('')
    const {
        register, handleSubmit,watch,formState: { errors }
    } = useForm()
    const onsubmit = async (data) => {
        const csrf = await axiosClient.get('/sanctum/csrf-cookie')
        .then(res => {
            let datas = axiosClient.post('/register', data)
            .then(res => {
                console.log(res.data);
            })
        })
    }
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] lg:flex-row '>
        <div className='w-[100%] h-[50vh] flex justify-center lg:h-full'>
        <img src="https://cdn.dribbble.com/userupload/4714349/file/original-8efac4c1c17b9c90fba8c8ec748d648a.gif" alt="" />
        </div>
        <div className='w-[100%] h-[70vh] p-4 bg-gray-400 flex flex-col justify-center items-center lg:h-full'>
        <h1 className='text-[#344055] font-bold text-5xl my-4'>Register</h1>
        <p>Join our chat app and start chatting with friends!</p>
        <form onSubmit={handleSubmit(onsubmit)} className='w-[50%]'>
            <div className='relative'>
                <EmailIcon className='absolute top-[27px] left-3'/>
                <div className="w-full">
                    <input type="text" className='my-4 placeholder:text-gray-2300 w-full pl-10 py-2 outline-none rounded-md border-2 shadow-sm' placeholder='Enter your email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'This field required'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'The email should be in this format: info@info.com'
                        },
                        max: {
                            value: 50,
                            message: `The email shouldn't passed 100 charachters.`
                        }
                    })}
                    />
                </div>
                <div className="w-full">
                    <p className='text-red-500 text-sm mt-[-12px]'>{errors.email?.message}</p>
                </div>
            </div>
            <div className='relative'>
                <PasswordIcon className='absolute top-[27px] left-3'/>
                <div className="w-full">
                    <input type="password" className='my-4 placeholder:text-gray-2300 w-full pl-10 py-2 outline-none rounded-md border-2 shadow-sm' placeholder='Enter your password'
                    {...register('password',{
                        required: {
                            value: true,
                            message: 'The password is required.'
                        },
                        max: {
                            value: 50,
                            message: `The password shouldn't passed 50 charachters`
                        },
                        min: {
                            value: 8,
                            message: `Password must be at least 8 characters long!`
                        },
                        onChange: e => {
                            setPassword(e.target.value)
                        }
                    }
                    )}
                    />
                </div>
                <div className="w-full">
                    <p className='text-red-500 text-sm mt-[-12px]'>{errors.password?.message}</p>
                </div>
            </div>
                <div className='relative'>
                <PasswordIcon className='absolute top-[27px] left-3'/>
                <div className="w-full">
                    <input type="password" className='my-4 placeholder:text-gray-2300 w-full pl-10 py-2 outline-none rounded-md border-2 shadow-sm' placeholder='Confirm your password'
                    {...register('password_confirm',{
                        required: {
                            value: true,
                            message: 'The password confirmation is required.'
                        },
                        max: {
                            value: 50,
                            message: `The password shouldn't passed 50 charachters`
                        },
                        validate: match => {
                            return match === password || 'Passwords should match!'
                        }
                    })}
                    />
                </div>
                <div className="w-full">
                    <p className='text-red-500 text-sm mt-[-12px]'>{errors.password_confirm?.message}</p>
                </div>
            </div>
            <div>
            <button type='submit' className='bg-bluishGreen-100 px-4 py-2 rounded-md mt-2 text-white text-lg hover:text-bluishGreen-100 hover:bg-white'>Register</button>
            </div>
        </form>
        <h2 className='text-[#344055] my-4 text-2xl relative ele-after'><span className='font-bold'>Register</span> with others</h2>
        <div className='px-6 py-4 border border-gray-1000 rounded-lg flex cursor-pointer'>
            <img className='w-6 h-6 mr-2' src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" alt="" />
            <h4>Register with <span className='font-bold'>GOOGLE</span></h4>
        </div>
        </div>
    </div>
  )
}
