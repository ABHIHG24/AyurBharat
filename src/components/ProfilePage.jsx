import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.userState.user);
  const { username, age, dateOfBirth, email, phoneNumber, avatar } = user;
  return (
    <div className="flex justify-evenly gap-60 h-96 relative">
      <div className="avatar h-64">
        <div className="w-auto h-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={avatar} />
        </div>
      </div>

      <div className=" flex flex-col font-bold gap-6">
        <h2 className="text-2xl font-extrabold text-secondary">{username}</h2>
        <p>age : {age}</p>
        <p>dob : {dateOfBirth}</p>
        <p>email : {email}</p>
        <p>phoneNumber : {phoneNumber}</p>
      </div>
      <div className="absolute bottom-0 flex gap-8">
        <NavLink to="update_profile">
          <button className="btn btn-success ">Edit profile</button>
        </NavLink>
        <NavLink to="update_password">
          <button className="btn btn-error ">Change password</button>
        </NavLink>
      </div>
    </div>
  );
};
export default ProfilePage;
