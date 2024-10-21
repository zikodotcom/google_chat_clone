import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setBackHome,
  setMessageData,
} from "../feautures/message/messageSlice";
import { axiosClient } from "../axios";
import { useForm } from "react-hook-form";

import { changeLastMessage, changeStatus } from "../feautures/listFriend/listFriendSlice";
import socket from "../service/socket";
export default function Message() {
  const io = socket;
  const dispatch = useDispatch();
  const ref = useRef(null);
  const messageBox = useRef(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const handleBack = () => {
    dispatch(setBackHome());
  };
  const { id } = useSelector((state) => state.message.displayMessage);
  const { messageData } = useSelector((state) => state.message);
  const { value } = useSelector((state) => state.user);
  useEffect(() => {
    io.emit("join-room", value.id);
    axiosClient.get(`/getMessages/${id}`).then((res) => {
      dispatch(setMessageData(res.data));
      setStatus(res.data.friend.status);
      setLoading(false);
      setTimeout(() => scrollDown(), 1000);
    });
    io.on("SendMessage", (message) => {
      if (message.sender == id) {
        // TODO Know why the message go to sender part and why is repeated couple of times
        dispatch(
          addMessage({
            data: message,
          })
        );
        dispatch(
          changeLastMessage({
            id: message.sender,
            data: message,
          })
        );
        setTimeout(() => scrollDown(), 200);
      }
    });
    // TODO ON added new friend
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
    // Clean up the event listener when the component unmounts
    return () => {
      io.off();
    };
  }, [id]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm();
  let onSubmit = async (data) => {
    await axiosClient
      .post("/sendMessage", {
        text: data.message,
        receiver: id,
      })
      .then((res) => {
        setValue("message", "");
        dispatch(
          addMessage({
            data: res.data,
          })
        );
        dispatch(
          changeLastMessage({
            id: res.data.receiver,
            data: res.data,
          })
        );
      });
    scrollDown();
  };
  const scrollDown = () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="h-[90vh] w-full bg-white m-2 rounded-3xl">
          <div className="flex" key={messageData.friend["_id"]}>
            <div className="relative flex items-center p-2 border-b-2 w-full">
              <span
                className="cursor-pointer p-2 hover:rounded-full hover:bg-gray-400"
                onClick={() => handleBack()}
              >
                <ArrowBackIcon />
              </span>
              <div className="relative">
                <img
                  className="w-9 h-9 rounded-full mx-2"
                  src={messageData.friend.picture}
                  alt=""
                />
                {status == "automatic" ? (
                  <div className="h-3 w-3 bg-green-700 rounded-full absolute right-1 bottom-0"></div>
                ) : status == "distrub" ? (
                  <div className="bg-red-800 flex justify-center items-center w-3 h-3 rounded-full absolute right-1 bottom-0">
                    <div className="w-[50%] h-[1px] bg-white"></div>
                  </div>
                ) : (
                  <div className="bg-black w-3 h-3 rounded-full absolute right-1 bottom-0"></div>
                )}
              </div>
              <span className="text-lg font-semibold">
                {messageData.friend.name}
              </span>
            </div>
          </div>
          <div className="h-[86%] flex flex-col justify-end">
            <div className="p-4 overflow-y-scroll" id="scroll" ref={scroll}>
              {messageData.messages.map((message) => {
                var during = new Date(message.createdAt);
                var date = new Date();
                const timeDiff = date - during;
                const secondsDifference = Math.floor(timeDiff / 1000);
                const minutesDifference = Math.floor(secondsDifference / 60);
                const hoursDifference = Math.floor(minutesDifference / 60);
                const daysDifference = Math.floor(hoursDifference / 24);
                const weeksDifference = Math.floor(daysDifference / 7);
                var timeMessage = "";
                if (weeksDifference > 0) {
                  timeMessage = `${weeksDifference} weeks`;
                } else if (daysDifference > 0) {
                  timeMessage = `${daysDifference} days`;
                } else if (hoursDifference > 0) {
                  timeMessage = `${hoursDifference} hours`;
                } else if (minutesDifference > 0) {
                  timeMessage = `${minutesDifference} mins`;
                } else if (secondsDifference > 10) {
                  timeMessage = `${secondsDifference} secs`;
                } else {
                  timeMessage = "Right now";
                }
                {
                  message.sender["_id"], messageData.user;
                }
                if (
                  message.receiver["_id"] == messageData.user ||
                  message.receiver == messageData.user
                ) {
                  return (
                    <div>
                      {/* TODO: STYLING MESSAGE FOR SENDER */}
                      <div className="h-[auto] flex">
                        <div className="mr-4">
                          <img
                            src={messageData.friend.picture}
                            className="w-9 h-9 rounded-full"
                            alt=""
                          />
                        </div>
                        <div className="w-[70%]">
                          <p>
                            <span className="text-sm font-bold mr-2">
                              {messageData.friend.name}
                            </span>
                            <span className="text-sm text-[#5e5e5e] font-normal mr-2">
                              {timeMessage}
                            </span>
                          </p>
                          <p className="bg-[#f2f2f2] py-2 px-2 text-sm rounded-3xl inline-block mb-4">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      {/* TODO: STYLING MESSAGE FOR RECEIVER */}
                      <div className="h-[auto] flex" dir="RTL">
                        <div className="w-[70%]">
                          <p dir="LTR" className="flex justify-end">
                            <span className="text-sm text-[#5e5e5e] font-normal mr-2">
                              {timeMessage}
                            </span>
                          </p>
                          <p
                            className="bg-[#f2f2f2] py-2 px-2 text-sm rounded-3xl inline-block mb-4"
                            dir="LTR"
                          >
                            {message.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div ref={ref} />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center border-t border-gray-200 px-4 py-3 mt-4"
            >
              <input
                type="text"
                ref={messageBox}
                placeholder="Type a message..."
                {...register("message", {})}
                className="w-full px-3 py-2 rounded-3xl border border-blue-500 focus:outline-none focus:border-gray-1600 placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="ml-2 p-2 hover:bg-gray-900 hover:rounded-full text-center cursor-pointer"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
