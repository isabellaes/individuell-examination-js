import { useEffect, useState } from "react";
import { setPostsByUser } from "../store/postSlice";
import { RootState, useAppDispatch } from "../store/store";
import { logIn } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

interface Props {
  onClose: () => void;
}

const LogIn = (props: Props) => {
  const [userInput, setUserInput] = useState<string>();
  const [inputError, setInputError] = useState<string>("");
  const [logInError, setLoginError] = useState<string>("");

  const errorMessage = useSelector(
    (state: RootState) => state.user.errorMessage
  );

  useEffect(() => {
    if (errorMessage) {
      setLoginError(errorMessage);
    }
  }, [errorMessage]);

  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  function handleLogIn() {
    if (Number(userInput)) {
      setInputError("");
      dispatch(logIn(Number(userInput)));
      dispatch(setPostsByUser(Number(userInput)));
      navigation("/");
    } else {
      setInputError("Invalid id, Id must be of type number.");
    }
  }
  return (
    <div className="login-Modal">
      <div className="login-component">
        <CloseIcon onClick={() => props.onClose()}></CloseIcon>
        <div className="login-form">
          <h1>Log in</h1>
          <label htmlFor="input-id"> Enter user ID:</label>
          <input
            id="input-id"
            required
            type="text"
            placeholder="Number 1-10" /* Placeholder only for dev-mode */
            onChange={(e) => setUserInput(e.currentTarget.value)}
          ></input>
          <p>{inputError}</p>
          <p>{logInError}</p>
          <button onClick={() => handleLogIn()}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
