import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { MESSAGE } from "../constants/messages";
import { socket } from "../utils/socket";

export default function JoinRoom() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [roomId, setRoomId] = useState("");
  const [roomError, setRoomError] = useState("");
  const changeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const formHasError = () => {
    let hasError = false;

    if (name.trim() === "") {
      setNameError(MESSAGE.nameError);
      hasError = true;
    } else {
      setNameError("");
    }

    if (roomId === "") {
      setRoomError(MESSAGE.roomIdEmpty);
      hasError = true;
    } else {
      setRoomError("");
    }

    return hasError;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formHasError()) {
      socket.emit("joinRoom", name, roomId);
    }
  };

  useEffect(() => {
    const nameErrorHandler = () => {
      setNameError(MESSAGE.nameError);
    };
    const roomIdEmptyHandler = () => {
      setRoomError(MESSAGE.roomIdEmpty);
    };
    const roomNotExistsHandler = () => {
      setRoomError(MESSAGE.roomNotExists);
    };
    const roomFullHandler = () => {
      setRoomError(MESSAGE.roomFull);
    };

    socket.on("nameError", nameErrorHandler);
    socket.on("roomIdEmpty", roomIdEmptyHandler);
    socket.on("roomNotExists", roomNotExistsHandler);
    socket.on("roomFull", roomFullHandler);

    return () => {
      socket.off("nameError", nameErrorHandler);
      socket.off("roomIdEmpty", roomIdEmptyHandler);
      socket.off("roomNotExists", roomNotExistsHandler);
      socket.off("roomFull", roomFullHandler);
    };
  }, []);

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <Link to="/" className="link">
        <FaArrowLeft /> Back to Home
      </Link>

      <h1>Join a Room</h1>

      <div className="formField">
        <input
          type="text"
          placeholder={MESSAGE.namePlaceholder}
          value={name}
          onChange={changeName}
        />
        <span className="error">{nameError}</span>
      </div>

      <div className="formField">
        <input
          type="text"
          placeholder={MESSAGE.roomPlaceholder}
          value={roomId}
          onChange={changeRoomId}
        />
        <span className="error">{roomError}</span>
      </div>

      <button className="button">Join</button>
    </form>
  );
}
