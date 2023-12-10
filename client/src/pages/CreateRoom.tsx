import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { MESSAGE } from "../constants/messages";
import { socket } from "../utils/socket";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim() === "") {
      setNameError(MESSAGE.nameError);
      return;
    }
    setNameError("");
    socket.emit("createRoom", name);
  };

  useEffect(() => {
    const nameErrorHandler = () => {
      setNameError(MESSAGE.nameError);
    };

    socket.on("nameError", nameErrorHandler);

    return () => {
      socket.off("nameError", nameErrorHandler);
    };
  }, []);

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <Link to="/" className="link">
        <FaArrowLeft /> Back to Home
      </Link>
      <h1>Create Room</h1>

      <div className="formField">
        <input
          type="text"
          placeholder={MESSAGE.namePlaceholder}
          value={name}
          onChange={changeName}
        />
        <span className="error">{nameError}</span>
      </div>

      <button className="button">Create Room</button>
    </form>
  );
}
