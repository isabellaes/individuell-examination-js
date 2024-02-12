import { useState } from "react";
import { setPostsByUser } from "../store/postSlice";
import { useAppDispatch } from "../store/store";
import { logIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClose: () => void;
}

const LogIn = (props: Props) => {
  const [userInput, setUserInput] = useState<string>();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  function handleLogIn() {
    if (userInput) {
      dispatch(logIn(Number(userInput)));
      dispatch(setPostsByUser(Number(userInput)));
      navigation("/");
    }
  }
  return (
    <div className="login-Modal">
      <div className="login-component">
        <h1>Log in</h1>
        <label htmlFor="input-id"> Enter user ID:</label>
        <input
          id="input-id"
          type="text"
          placeholder="Number 1-10"
          onChange={(e) => setUserInput(e.currentTarget.value)}
        ></input>
        <button onClick={() => handleLogIn()}>Log in</button>
        <CloseIcon onClick={() => props.onClose()}></CloseIcon>
      </div>
    </div>
  );
};

export default LogIn;
