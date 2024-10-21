import React, { useEffect } from "react";
import LeftAside from "./components/LeftAside";
import Main from "./components/main";
import { axiosClient } from "./axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./feautures/user/userSlice";
import {
  changeStatus,
  setListFriend,
} from "./feautures/listFriend/listFriendSlice";
import Pusher from "pusher-js";
import { changeLastMessage } from "./feautures/listFriend/listFriendSlice";
import socket from "./service/socket";

export default function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.value);

  const io = socket;
  // TODO: Check if user login or not and get his data if login
  useEffect(() => {
    // ? Get list friends
    axiosClient.get("/getFriends").then((res) => {
      console.log(res.data);
      dispatch(setListFriend(res.data));
    });
    io.emit("join-room", id);
    io.on("SendMessage", (message) => {
      dispatch(
        changeLastMessage({
          id: message.sender,
          data: message,
        })
      );
    });
    // TODO How to combine between this two
    io.on("addNewFriend", (data) => {
      dispatch(
        changeLastMessage({
          id: data.friendTwo,
          currentUser: id,
          data,
        })
      );
    });
    // TODO Change status
    io.on("changeStatus", (data) => {
      console.log("change status", data);
      dispatch(changeStatus(data));
    });
  }, []);
  return (
    <div className="flex bg-slate-100 h-[100vh] p-4">
      <LeftAside />
      <Main />
    </div>
  );
}
