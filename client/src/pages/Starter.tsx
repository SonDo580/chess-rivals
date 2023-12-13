import { Link } from "react-router-dom";

function Starter() {
  return (
    <div className="wrapper">
      <h1>Chess Rivals</h1>
      <Link to="create" className="button">
        Create room
      </Link>
      <Link to="join" className="button">
        Join a room
      </Link>
    </div>
  );
}

export default Starter;
