// TODO Connect to socket.io

import { io } from "socket.io-client";

const socket = io("http://localhost:3001/", {
  withCredentials: true,
});

export default socket;
