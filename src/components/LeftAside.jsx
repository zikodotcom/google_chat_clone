import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { axiosClient } from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIdFriend } from '../feautures/message/messageSlice';
export default function LeftAside() {
  const dispatch = useDispatch()
  let lists = [
    {
      icon: 'https://www.gstatic.com/dynamite/images/menuoptions/create_spaces.svg',
      text: 'Create space'
    },
    {
      icon: 'https://www.gstatic.com/dynamite/images/menuoptions/browse_spaces.svg',
      text: 'Browse space'
    },
    {
      icon: 'https://www.gstatic.com/dynamite/images/menuoptions/play_apps.svg',
      text: 'Find Apps'
    },
    {
      icon: 'https://www.gstatic.com/dynamite/images/menuoptions/request.svg',
      text: 'Message Requests'
    },
  ]
  let imgTest = 'https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const [isActive, setIsActive] = useState(false);
  const [isEnter, setEnter] = useState({id: 0, isCheck: false});
  const handleActive = () => {
    setIsActive(!isActive)
  }
  const handleEnter = (id)=> {
    setEnter({
      id, 
      isCheck: true
    })
  }
  const handleLeave = (id)=> {
    setEnter({
      id, 
      isCheck: false
    })
  }
  // TODO: Get list friends with the last message
  useEffect(() => {

  }, [])
  const displayMessage = id => {
    dispatch(setIdFriend(id))
  }
  const {data}= useSelector(state => state.listFriend)
  return (
    <aside className='w-[20%]'>
      <div className='flex items-center'>
        <div className='mr-4 text-slate-500 font-bold cursor-pointer hover:bg-[rgba(60,64,67,.08)] hover:rounded-full hover:opacity-50 p-4 hover:text-black'>
          <MenuIcon className=''/>
        </div>
        <div className='fixed left-20'>
          <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_chat_default_1x.png" alt="" />
        </div>
      </div>
      <div  className='overflow-visible h-[20vw]'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <ArrowDropDownIcon/>
            <h3>Chat</h3>
          </div>
          <div className='text-blue-800 p-2 cursor-pointer hover:bg-gray-900 hover:rounded-full' onClick={()=> handleActive()}>
            <AddIcon/>
          </div>
          <div className={isActive ? 'fixed bg-white shadow-lg rounded-lg left-80 ease-in-out transition  scale-100 origin-top-left z-20' : 'fixed bg-white shadow-lg rounded-lg left-80 scale-0 transition  ease-in-out origin-top-left'}>
            <ul>
              {
                lists.map(el => {
                  return (
                    <li className='flex items-center px-4 my-2 cursor-pointer hover:bg-slate-200'> 
                      <img src={el.icon} alt="" />
                      {el.text} 
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        {/* TODO: Message Lists */}
        <div>
              {
                data.map(friend => {
                const dateString = friend.message.created_at;
                const messageDate = new Date(dateString);
                const currentDate = new Date();
                let date = ''
                if (messageDate.toDateString() === currentDate.toDateString()) {
                    date = 'Today'
                } else {
                    currentDate.setDate(currentDate.getDate() - 1);
                    if (messageDate.toDateString() === currentDate.toDateString()) {
                      date = 'Yesterday'
                    } else {
                        const options = { month: 'long', day: 'numeric' };
                        const formattedDate = messageDate.toLocaleDateString(undefined, options);
                        date = formattedDate
                    }
                }
                  return (
                    <div className='flex justify-between items-center p-1 bg-blue-400 rounded-3xl cursor-pointer mt-2' 
                    onClick={() => displayMessage(friend.friend.id)} 
                    onMouseEnter={()=>handleEnter(friend.message.id_message)} 
                    onMouseLeave={()=> handleLeave(friend.message.id_message)}>
                      <div className='flex items-center'>
                      <div className='relative'>
                        <img className='w-9 h-9 rounded-full' src={friend.friend.image} alt="" />
                        <div className='h-3 w-3 bg-green-700 rounded-full absolute right-0 bottom-0'></div>
                      </div>
                      <div className='ml-2'>
                        <p className='text-sm font-semibold'>{friend.friend.name} <span className={isEnter.isCheck && isEnter.id == friend.message.id_message ? 'font-normal' : 'font-normal hidden'}>{date}</span></p>
                        <p className='text-xs'>{friend.message.messageText}</p>
                      </div>
                      </div>
                      <div className={isEnter.isCheck && isEnter.id == friend.message.id_message ? '' : 'hidden'}>
                        <MoreVertIcon/>
                      </div>
                    </div>
                  )
                })
              }
        </div>
      </div>
    </aside>
  )
}
