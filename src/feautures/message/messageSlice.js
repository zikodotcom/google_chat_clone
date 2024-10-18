import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayMessage: {},
  messageData: {
    messages: [],
  },
};

export const message = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdFriend: (state, action) => {
      state.displayMessage.id = action.payload;
      console.log(action.payload);
    },
    setBackHome: (state, action) => {
      state.displayMessage = {};
    },
    setMessageData: (state, action) => {
      state.messageData = action.payload;
    },
    addMessage: (state, action) => {
      state.messageData.messages.push(action.payload.data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIdFriend, setBackHome, setMessageData, addMessage } =
  message.actions;

export default message.reducer;
