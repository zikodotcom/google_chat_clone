import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

export const listFriend = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setListFriend: (state, action) => {
      state.data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setListFriend } = listFriend.actions

export default listFriend.reducer