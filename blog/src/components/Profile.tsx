import { useState, useEffect } from "react";
import { User } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile = () => {
  const [user, setUser] = useState<User>();

  const currentUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);
  return (
    <>
      <p>{user?.name}</p>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <p>{user?.id}</p>
    </>
  );
};

export default Profile;
