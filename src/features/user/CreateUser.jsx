import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "./userSlice";
import { Form, useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateUsername = useSelector((state) => state.user.username);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername(username));
    navigate("/menu");
    setUsername("");
  }

  return !stateUsername ? (
    <Form onSubmit={handleSubmit}>
      <p className="mb-4 mr-4 text-sm md:text-lg md:font-semibold md:text-stone-700">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-5 w-48 sm:w-96"
      />
      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </Form>
  ) : (
    <Button type="primary" to="/menu">
      Continue Ordering, {stateUsername}
    </Button>
  );
}

export default CreateUser;
