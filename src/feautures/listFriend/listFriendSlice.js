import { createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../axios";

const initialState = {
  data: [],
};

export const listFriend = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListFriend: (state, action) => {
      state.data = action.payload;
    },
    changeLastMessage: (state, action) => {
      // TODO Change last message or add friend with his last message
      // TODO Check if the friend exist or not
      const friend = state.data.findIndex(
        (el) => el.friend["_id"] == action.payload.id
      );
      console.log(friend);
      if (friend !== -1) {
        console.log(action.payload.data);
        // TODO If friend exists we will added in the first of array and remove it from the old index
        state.data.unshift({
          message: action.payload.data,
          friend: state.data[friend]["friend"],
        });
        state.data.splice(friend + 1, 1);
      } else {
        let data = action.payload.data;
        if (action.payload.currentUser == action.payload.id) {
          data["friend"] = action.payload.data["friendOne"];
        } else {
          data["friend"] = action.payload.data["friendTwo"];
        }
        state.data.unshift(action.payload.data);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListFriend, changeLastMessage } = listFriend.actions;

export default listFriend.reducer;
