import React, { useEffect } from 'react'
import LeftAside from './components/LeftAside'
import Main from './components/main'
import { axiosClient } from './axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userData } from './feautures/user/userSlice'
import {setListFriend} from './feautures/listFriend/listFriendSlice'

export default function Chat() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // TODO: Check if user login or not and get his data if login
  useEffect(() => {
    axiosClient.get('/v1/users')
    .then(res => {
      dispatch(userData(res.data))
    })
    .catch(err => {
      navigate('/');
    })
    axiosClient.get('/v1/friends')
    .then(res => {
      dispatch(setListFriend(res.data))
    })
  }, [])
  return (
    <div className='flex bg-slate-100 h-[100vh] p-4'>
        <LeftAside/>
        <Main/>
    </div>
  )
}
