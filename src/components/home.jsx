import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIdFriend } from '../feautures/message/messageSlice'

export default function Home() {
    const {data}= useSelector(state => state.listFriend)
    const dispatch = useDispatch()
    const displayMessage = id => {
        dispatch(setIdFriend(id));
    }
  return (
    <div className='h-[90vh] w-full bg-white m-2 p-4 rounded-3xl  justify-center items-center'>
        <h1>Home</h1>
        <div>
            {
                data.map(el => {
                    let during = new Date(el.message.created_at)
                    let date = new Date();
                    let newDuring = during.toLocaleString('en', {
                        year: 'numeric',
                        month: 'short',
                        day : '2-digit'
                    })
                    let newDate = date.toLocaleString('en', {
                        year: 'numeric',
                        month: 'short',
                        day : '2-digit'
                    })
                    let timeMessage = ''
                    if(newDuring == newDate){
                        let minuteDifferent = date.getMinutes() - during.getMinutes()
                        if(minuteDifferent === 0 || minuteDifferent === 1){
                            timeMessage = 'Right now'
                        }else if(minuteDifferent > 60){
                            let hoursDiffernet = date.getHours() - during.getMinutes();
                            timeMessage = `${hoursDiffernet}h`
                        }else{
                            timeMessage = `${minuteDifferent}mins`
                        }
                    }else if(date.getDate() - 1 == during.getDate()){
                        timeMessage = 'Yesterday'
                    }else{
                        timeMessage = during.toLocaleString('en', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit'
                        })
                    }
                    return (
                        <div className='mt-2 flex justify-between items-center px-2 border-b-2 py-2 cursor-pointer rounded-sm hover:bg-[rgba(11,87,208,.08)]' onClick={() => displayMessage(el.friend.id)}>
                            <div className="flex">
                                <div>
                                    <img src={el.friend.image} alt="" className='w-12 h-12 rounded-full' />
                                </div>
                                <div className='ml-2'>
                                    <p className='font-mono font-bold'>{el.friend.name}</p>
                                    <p>{el.message.messageText}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-xs '>{timeMessage}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
