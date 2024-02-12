import { User } from "../types";

interface Props {
  user: User;
}
const Profile = (props: Props) => {
  return (
    <>
      <h1>{props.user.name}</h1>
      <p>Username: {props.user.username}</p>
      <p>Email: {props.user.email}</p>
      <p>Id: {props.user.id}</p>
    </>
  );
};

export default Profile;
