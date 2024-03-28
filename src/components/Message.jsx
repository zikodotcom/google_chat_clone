import React, { useEffect, useRef, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setBackHome, setMessageData } from '../feautures/message/messageSlice';
import { axiosClient } from '../axios';
import { useForm } from 'react-hook-form';


export default function Message() {
    const dispatch = useDispatch()
    const scroll = useRef(null)
    const [loading, setLoading] = useState(true)
    const handleBack = () => {
        dispatch(setBackHome())
    }
    const {id} = useSelector(state => state.message.displayMessage)
    const {messageData} = useSelector(state => state.message)
    const {value} = useSelector(state => state.user)
    useEffect(() => {
        axiosClient.get(`/v1/message/${id}`)
        .then(res => {
            dispatch(setMessageData(res.data))
            setLoading(false)
    
        })
    }, [id])
    const {
        register, handleSubmit,watch,formState: { errors }, setError
      } = useForm()
      let onSubmit = async (data) => {
        await axiosClient.post('/v1/message', {
            messageText: data.message,
            id_receiver: id
        })
        .then(res => {
            dispatch(addMessage({
                data: res.data
            }))
        })
      }
      const scrollToBottom = () =>{

        if(scroll.current){
            // FIXME: Scroll message to the bottom
            console.log(scroll.current);
            scroll.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
              })
    ;
        }
      }
  return (
    <>
    {
        loading ? 'Loading...' : <div className='h-[90vh] w-full bg-white m-2 rounded-3xl'>
        <div className='flex' key={messageData.user.id}>
        <div className='relative flex items-center p-2 border-b-2 w-full'>
            <span className='cursor-pointer p-2 hover:rounded-full hover:bg-gray-400' onClick={() => handleBack()}><ArrowBackIcon/></span>
            <div className='activeAfter'>
            <img className='w-9 h-9 rounded-full mx-2' src={messageData.user.image} alt="" />
            </div>
            {/* <div className='h-3 w-3 bg-green-700 rounded-full absolute right-0 bottom-0'></div> */}
            <span className='text-lg font-semibold'>{messageData.user.name}</span>
        </div>
        </div>
        <div className='h-[86%] flex flex-col justify-end'>
        <div className='p-4 overflow-y-scroll' ref={scroll}>
            {    
                messageData.messages.map(message => {
                    scrollToBottom()
                    if(message.id_receiver == value.id){
                        return (
                            <div>
                                {/* TODO: STYLING MESSAGE FOR SENDER */}
                                <div className='h-[auto] flex'>
                                    <div className='mr-4'>
                                        <img src={messageData.user.image} className='w-9 h-9 rounded-full' alt="" />
                                    </div>
                                    <div className='w-[70%]'>
                                        <p>
                                        <span className='text-sm font-bold mr-2'>{messageData.user.name}</span>
                                        <span className='text-sm text-[#5e5e5e] font-normal mr-2'>Tue 01:29PM</span>
                                        </p>
                                        <p className='bg-[#f2f2f2] py-2 px-2 text-sm rounded-3xl inline-block mb-4'>
                                        {
                                            message.messageText
                                        }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div>
                                {/* TODO: STYLING MESSAGE FOR RECEIVER */}
                                <div className='h-[auto] flex' dir='RTL'>
                                    <div className='w-[70%]'>
                                        <p dir='LRT'>
                                        <span className='text-sm text-[#5e5e5e] font-normal mr-2'>Tue 01:29PM</span>
                                        </p>
                                        <p className='bg-[#f2f2f2] py-2 px-2 text-sm rounded-3xl inline-block mb-4' dir='LTR'>
                                        {
                                            message.messageText
                                        }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-t border-gray-200 px-4 py-3 mt-4">
            <input
            type="text"
            placeholder="Type a message..."
            {
                ...register('message', {})
            }
            className="w-full px-3 py-2 rounded-3xl border border-blue-500 focus:outline-none focus:border-gray-1600 placeholder:text-slate-600"
            />
            <button type='submit' className='ml-2 p-2 hover:bg-gray-900 hover:rounded-full text-center cursor-pointer'>
            <SendIcon/>
            </button>
        </form>
        </div>
    </div>
    }
    </>
  )
}
