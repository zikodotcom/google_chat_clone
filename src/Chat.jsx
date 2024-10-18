import React, { useEffect } from "react";
import LeftAside from "./components/LeftAside";
import Main from "./components/main";
import { axiosClient } from "./axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./feautures/user/userSlice";
import { setListFriend } from "./feautures/listFriend/listFriendSlice";
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
      dispatch(setListFriend(res.data));
      io.emit("join-room", id);
      io.on("SendMessage", (message) => {
        dispatch(
          changeLastMessage({
            id: message.receiver,
            data: message,
          })
        );
      });
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
    // axiosClient.get('/v1/users')
    // .then(res => {
    //   dispatch(userData(res.data))
    //   axiosClient.post('/v1/changeStatus', {
    //     id: res.data.id,
    //     status : 'automatic'
    //   })
    // })
    // .catch(err => {
    //   navigate('/');
    // })
    // axiosClient.get('/v1/friends')
    // .then(res => {
    //   dispatch(setListFriend(res.data))
    // })
    // Pusher.logToConsole = true;
    // const pusher = new Pusher('0f5d31c83f7740a9a3fa', {
    //     cluster: 'eu'
    // });
    // const channel = pusher.subscribe('my-channel');
    // const handleEvent = ({ message }) => {
    //   const messageSendIt = JSON.parse(message);
    //   console.log(messageSendIt)
    //       dispatch(changeLastMessage({
    //           id_sender: message.id_sender,
    //           message : messageSendIt,
    //           keys: 'message'
    //       }))
    //   }
    //   channel.bind('my-event', handleEvent);
    // const handleBeforeUnload = (e) => {
    //   e.preventDefault();
    //   axiosClient.post('/v1/changeStatus', {
    //     id: value.id,
    //     status: 'Set away'
    //   })
    // };
    // window.addEventListener('beforeunload', handleBeforeUnload);
    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
    // return () => {
    //   // Clean up: unsubscribe from Pusher channel
    //   channel.unbind('my-event', handleEvent);
    //   pusher.disconnect();
    // };
  }, []);
  return (
    <div className="flex bg-slate-100 h-[100vh] p-4">
      <LeftAside />
      <Main />
    </div>
  );
}
