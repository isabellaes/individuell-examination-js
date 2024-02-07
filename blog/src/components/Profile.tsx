import { User } from "../types";

interface Props {
  user: User;
}
const Profile = (props: Props) => {
  return (
    <>
      <h1>{props.user.name}</h1>
      <p>{props.user.username}</p>
      <p>{props.user.email}</p>
      <p>{props.user.id}</p>
    </>
  );
};

export default Profile;
