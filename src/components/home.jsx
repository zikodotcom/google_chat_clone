import { current } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdFriend } from "../feautures/message/messageSlice";

export default function Home() {
  const { data } = useSelector((state) => state.listFriend);
  const dispatch = useDispatch();
  const displayMessage = (id) => {
    dispatch(setIdFriend(id));
  };
  return (
    <div className="h-[90vh] w-full bg-white m-2 p-4 rounded-3xl  justify-center items-center">
      <h1>Home</h1>
      <div>
        {data.map((el) => {
          const { friend, message } = el;
          if (message) {
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
          }
          return (
            <div
              className="mt-2 flex justify-between items-center px-2 border-b-2 py-2 cursor-pointer rounded-sm hover:bg-[rgba(11,87,208,.08)]"
              onClick={() => displayMessage(friend["_id"])}
            >
              <div className="flex">
                <div>
                  <img
                    src={friend.picture}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-2">
                  <p className="font-mono font-bold">{friend.name}</p>
                  <p>{message ? message.text : ""}</p>
                </div>
              </div>
              <div>
                <p className="text-xs ">{timeMessage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
