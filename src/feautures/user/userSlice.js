import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userData } = user.actions

export default user.reducer