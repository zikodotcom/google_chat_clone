import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "../components/home";
import { useDispatch, useSelector } from "react-redux";
import Message from "./message";
import { axiosClient } from "../axios";
import Pusher from "pusher-js";
import { setIdFriend } from "../feautures/message/messageSlice";

export default function Main() {
  const dispatch = useDispatch();
  let lists = [
    {
      icon: <AccountCircleIcon />,
      text: "Your Profile",
    },
    {
      icon: <SettingsIcon />,
      text: "Settings",
    },
  ];
  const { value } = useSelector((state) => state.user);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    switch (value.status) {
      case "automatic":
        setStatus("automatic");
        break;
      case "distrub":
        setStatus("distrub");
        break;
      default:
        setStatus("Set away");
        break;
    }
  }, []);
  // TODO: Handle search
  const handleSearch = (e) => {
    if (e.target.value !== "") {
      axiosClient.get(`/user/${e.target.value}`).then((res) => {
        setSearch(res.data);
      });
    } else {
      setSearch([]);
    }
  };
  let imgTest =
    "https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const [isShow, setShow] = useState(true);
  const [isActive, setActive] = useState(false);
  const [classs, setClass] = useState(
    "h-auto w-[185px] bg-white rounded-md shadow-md absolute top-[44px] right-0 none hidden flex-col justify-center items-center"
  );
  const [status, setStatus] = useState("automatic");
  const handleShow = () => {
    isShow
      ? setClass(
          "h-auto w-[185px] bg-white rounded-md shadow-md absolute top-[44px] right-0 flex flex-col justify-center items-center"
        )
      : setClass(
          "h-auto w-[185px] bg-white rounded-md shadow-md absolute top-[44px] right-0 none hidden flex-col justify-center items-center"
        );
    setShow(!isShow);
  };
  const displayStatus = () => {
    if (status === "automatic") {
      return (
        <>
          <div className="bg-green-700 w-3 h-3 rounded-full"></div>
          <div>Active</div>
        </>
      );
    } else if (status === "distrub") {
      return (
        <>
          <div className="bg-red-800 flex justify-center items-center w-3 h-3 rounded-full">
            <div className="w-[50%] h-[1px] bg-white"></div>
          </div>
          <div>Do not distrub</div>
        </>
      );
    } else {
      return (
        <>
          <div className="bg-black w-3 h-3 rounded-full"></div>
          <div>Set away</div>
        </>
      );
    }
  };
  const handleStatus = (status) => {
    axiosClient.post("/v1/changeStatus", {
      id: value.id,
      status,
    });
    setStatus(status);
  };
  const handleDisplay = () => {
    setActive(!isActive);
  };
  const { displayMessage } = useSelector((state) => state.message);
  const displayMessageFN = (id) => {
    dispatch(setIdFriend(id));
    setSearch([]);
  };
  return (
    <div className="w-[95%]">
      <div>
        <div className="flex items-center justify-between w-full relative">
          <div className="absolute left-2">
            <SearchIcon />
          </div>
          <input
            type="search"
            placeholder="Search in chat"
            className="bg-[#dae8ff] w-[60%] rounded-3xl py-2 pr-4 pl-10 outline-none placeholder:text-gray-1800"
            onChange={(e) => handleSearch(e)}
          />
          {search.length > 0 ? (
            <div className="absolute top-10 bg-slate-50 shadow-xl rounded-lg w-[60%] z-50 h-auto max-h-[50vh] overflow-auto">
              {search.map((usr) => {
                return (
                  <div
                    className="p-2 flex items-center space-x-4 cursor-pointer rounded-lg hover:bg-slate-200"
                    onClick={() => displayMessageFN(usr["_id"])}
                  >
                    <img
                      src={usr.picture}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <span>{usr.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div
            className="flex items-center space-x-2 p-2 bg-[#dae8ff] rounded-3xl cursor-pointer relative"
            onClick={() => handleShow()}
          >
            {displayStatus()}
            <div>
              <KeyboardArrowDownIcon />
            </div>
            <div className={classs}>
              <div
                className="flex items-center justify-between w-full p-2 z-20 hover:bg-gray-300"
                onClick={() => handleStatus("automatic")}
              >
                <div className="bg-green-700 w-3 h-3 rounded-full"></div>
                <div className="px-2">
                  <p className="text-base font-semibold">Automatic</p>
                  <p className="text-xs">Based on chat activity</p>
                </div>
                <div>{status === "automatic" ? <CheckIcon /> : ""}</div>
              </div>
              <div
                className="flex items-center justify-between w-full p-2 hover:bg-gray-300"
                onClick={() => handleStatus("distrub")}
              >
                <div className="bg-red-800 flex justify-center items-center w-3 h-3 rounded-full">
                  <div className="w-[50%] h-[1px] bg-white"></div>
                </div>
                <div className="px-2">
                  <p className="text-base font-semibold">Do not distrub</p>
                  <p className="text-xs">Based on chat activity</p>
                </div>
                <div>{status === "distrub" ? <CheckIcon /> : ""}</div>
              </div>
              <div
                className="flex items-center justify-between w-full p-2 hover:bg-gray-300"
                onClick={() => handleStatus("away")}
              >
                <div className="bg-transparent border-[3px] border-black w-3 h-3 rounded-full"></div>
                <div className="px-2">
                  <p className="text-base font-semibold">Set away</p>
                  <p className="text-xs">Based on chat activity</p>
                </div>
                <div>{status === "away" ? <CheckIcon /> : ""}</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={imgTest}
              className="rounded-full w-10 h-10 border-2 border-green-600 cursor-pointer"
              alt=""
              onClick={handleDisplay}
            />
            <div
              className={
                isActive
                  ? "fixed bg-white shadow-lg rounded-lg p-1 ease-in-out right-[20px] transition  scale-100 origin-top-right z-20"
                  : "fixed bg-white shadow-lg rounded-lg p-1 ease-in-out right-[20px] transition  scale-0 origin-top-right z-20"
              }
            >
              <ul>
                {lists.map((el) => {
                  return (
                    <li className="flex items-center space-x-2 px-4 py-2 my-2 cursor-pointer hover:bg-slate-200">
                      {el.icon}
                      <p>{el.text} </p>
                    </li>
                  );
                })}
                <hr />
                <li className="flex items-center space-x-2 px-4 py-2 my-2 cursor-pointer hover:bg-slate-200">
                  <LogoutIcon />
                  <p>Log out</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {/* TODO: Welcoming page */}
      {displayMessage.id !== undefined ? <Message /> : <Home />}
    </div>
  );
}
