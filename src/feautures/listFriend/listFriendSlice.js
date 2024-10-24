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
        // TODO If friend exists we will added in the first of array and remove it from the old index
        state.data.unshift({
          message: action.payload.data,
          friend: state.data[friend]["friend"],
        });
        state.data.splice(friend + 1, 1);
      } else {
        console.log(action.payload.data);
        // TODO Add a condition to check if we are add a message before the friend is exist
        if (!action.payload.isMessage) {
          console.log(action.payload.data);
          state.data = [
            {
              message: action.payload.data.message,
              friend: action.payload.data.friend,
            },
            ...state.data,
          ];
        }
      }
    },
    changeStatus: (state, action) => {
      // TODO: Check if user exists
      const user = state.data.findIndex(
        (el) => el.friend["_id"] == action.payload.id
      );
      if (user !== -1) {
        state.data[user]["friend"]["status"] = action.payload.status;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListFriend, changeLastMessage, changeStatus } =
  listFriend.actions;

export default listFriend.reducer;
