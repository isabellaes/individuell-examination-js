import { useState } from "react";
import { setPostsByUser } from "../store/postSlice";
import { useAppDispatch } from "../store/store";
import { logIn } from "../store/userSlice";

interface Props {
  onClose: () => void;
}

const LogIn = (props: Props) => {
  const [userInput, setUserInput] = useState<string>();
  const dispatch = useAppDispatch();
  function handleLogIn() {
    if (userInput) {
      dispatch(logIn(Number(userInput)));
      dispatch(setPostsByUser(Number(userInput)));
    }
  }
  return (
    <div className="login-Modal">
      <div className="login-component">
        <label htmlFor="input-id"> Enter user ID:</label>
        <input
          id="input-id"
          type="text"
          placeholder="Number 1-10"
          onChange={(e) => setUserInput(e.currentTarget.value)}
        ></input>
        <button onClick={() => handleLogIn()}>Log in</button>
        <button onClick={() => props.onClose()}>Close</button>
      </div>
    </div>
  );
};

export default LogIn;
