import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { axiosClient } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { setIdFriend } from "../feautures/message/messageSlice";
import Pusher from "pusher-js";
import { changeLastMessage } from "../feautures/listFriend/listFriendSlice";
export default function LeftAside() {
  const dispatch = useDispatch();
  let lists = [
    {
      icon: "https://www.gstatic.com/dynamite/images/menuoptions/create_spaces.svg",
      text: "Create space",
    },
    {
      icon: "https://www.gstatic.com/dynamite/images/menuoptions/browse_spaces.svg",
      text: "Browse space",
    },
    {
      icon: "https://www.gstatic.com/dynamite/images/menuoptions/play_apps.svg",
      text: "Find Apps",
    },
    {
      icon: "https://www.gstatic.com/dynamite/images/menuoptions/request.svg",
      text: "Message Requests",
    },
  ];
  const [isActive, setIsActive] = useState(false);
  const [isEnter, setEnter] = useState({ id: 0, isCheck: false });
  const handleActive = () => {
    setIsActive(!isActive);
  };
  const handleEnter = (id) => {
    setEnter({
      id,
      isCheck: true,
    });
  };
  const handleLeave = (id) => {
    setEnter({
      id,
      isCheck: false,
    });
  };
  const { data } = useSelector((state) => state.listFriend);
  // TODO: Get list friends with the last message
  useEffect(() => {
    console.log(data);
    //     Pusher.logToConsole = true;
    //     const pusher = new Pusher('0f5d31c83f7740a9a3fa', {
    //         cluster: 'eu'
    //     });
    //     const channel = pusher.subscribe('my-channel');
    //     const changeStatusEvent = ({statusUsr}) => {
    //         dispatch(changeLastMessage({
    //           name: statusUsr.name,
    //           message : statusUsr,
    //           keys: 'friend'
    //       }))
    //   }
    //   channel.bind('changeStatus', changeStatusEvent);
    //   return () => {
    //     // Clean up: unsubscribe from Pusher channel
    //     channel.unbind('changeStatus', changeStatusEvent);
    //     pusher.disconnect();
    // };
  }, []);
  const displayMessage = (id) => {
    dispatch(setIdFriend(id));
  };

  return (
    <aside className="w-[20%]">
      <div className="flex items-center">
        <div className="mr-4 text-slate-500 font-bold cursor-pointer hover:bg-[rgba(60,64,67,.08)] hover:rounded-full hover:opacity-50 p-4 hover:text-black">
          <MenuIcon className="" />
        </div>
        <div className="fixed left-20">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_chat_default_1x.png"
            alt=""
          />
        </div>
      </div>
      <div className="overflow-visible h-[20vw]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <ArrowDropDownIcon />
            <h3>Chat</h3>
          </div>
          <div
            className="text-blue-800 p-2 cursor-pointer hover:bg-gray-900 hover:rounded-full"
            onClick={() => handleActive()}
          >
            <AddIcon />
          </div>
          <div
            className={
              isActive
                ? "fixed bg-white shadow-lg rounded-lg left-80 ease-in-out transition  scale-100 origin-top-left z-20"
                : "fixed bg-white shadow-lg rounded-lg left-80 scale-0 transition  ease-in-out origin-top-left"
            }
          >
            <ul>
              {lists.map((el) => {
                return (
                  <li className="flex items-center px-4 my-2 cursor-pointer hover:bg-slate-200">
                    <img src={el.icon} alt="" />
                    {el.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* TODO: Message Lists */}
        <div>
          {data
            ? data.map((el) => {
                const { friend, message } = el;
                if (message) {
                  var id_message = message["_id"];
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
                } else {
                  var id_message = undefined;
                }
                return (
                  <div
                    className="flex justify-between items-center p-1 bg-blue-400 rounded-3xl cursor-pointer mt-2"
                    onClick={() => displayMessage(friend["_id"])}
                    onMouseEnter={() => handleEnter(id_message)}
                    onMouseLeave={() => handleLeave(id_message)}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          className="w-9 h-9 rounded-full"
                          src={friend.picture}
                          alt=""
                        />
                        {friend.status == "automatic" ? (
                          <div className="h-3 w-3 bg-green-700 rounded-full absolute right-0 bottom-0"></div>
                        ) : friend.status == "distrub" ? (
                          <div className="bg-red-800 flex justify-center items-center w-3 h-3 rounded-full absolute right-0 bottom-0">
                            <div className="w-[50%] h-[1px] bg-white"></div>
                          </div>
                        ) : (
                          <div className="bg-black w-3 h-3 rounded-full absolute right-0 bottom-0"></div>
                        )}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-semibold">
                          {friend.name}{" "}
                          <span
                            className={
                              isEnter.isCheck && isEnter.id == id_message
                                ? "font-normal"
                                : "font-normal hidden"
                            }
                          >
                            {timeMessage}
                          </span>
                        </p>
                        <p className="text-xs">{message ? message.text : ""}</p>
                      </div>
                    </div>
                    <div
                      className={
                        isEnter.isCheck && isEnter.id == id_message
                          ? ""
                          : "hidden"
                      }
                    >
                      <MoreVertIcon />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </aside>
  );
}
