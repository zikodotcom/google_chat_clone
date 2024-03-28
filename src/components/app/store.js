import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../../feautures/user/userSlice'
import listFriendSlice from '../../feautures/listFriend/listFriendSlice'
import messageSlice from '../../feautures/message/messageSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    listFriend : listFriendSlice,
    message: messageSlice
  },
})

