import React, { useState } from "react";
import axios from "axios";
// import "./resetPassword2.css";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomFetch } from "../axios/Costomaxios";

const UpdatePassword = () => {
  // const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { mutate: reset, isPending } = useMutation({
    mutationFn: async (data) => {
      await CustomFetch.put(`/api/user/password/update`, data)
        .then((res) => {
          // console.log(res.data);
          toast.success("Password change successful");
          navigate("/me");
        })
        .catch((err) => {
          toast.success("Password change unsuccessful ");
          // console.log("Error resetting password:", err);
        });
    },
  });

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;
    // console.log(passw, repassw);
    if (newPassword !== confirmPassword) {
      toast.success("Password and re-entered password do not match");
      return;
    }

    if (data.newPassword.length < 8) {
      toast.success("password should contain at least 8 characters");
      return;
    }
    reset(data);
  };

  return (
    <div id="resetpassw" className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">change Your Password</h1>
      <label htmlFor="password" className="text-lg font-bold">
        Enter your current password
      </label>
      <input
        type="password"
        required
        id="password"
        name="oldPassword"
        value={data.password}
        onChange={handleChange}
        className="border border-gray-400 rounded p-2 mb-4"
      />
      <label htmlFor="password" className="text-lg font-bold">
        Enter your new password
      </label>
      <input
        type="password"
        required
        id="password"
        name="newPassword"
        value={data.password}
        onChange={handleChange}
        className="border border-gray-400 rounded p-2 mb-4"
      />
      <label htmlFor="rePassword" className="text-lg font-bold">
        Re-enter your new password
      </label>
      <input
        type="password"
        required
        id="confirmPassword"
        name="confirmPassword"
        value={data.repassword}
        onChange={handleChange}
        className="border border-gray-400 rounded p-2 mb-4"
      />
      <div className="flex flex-col gap-2 items-center">
        <button onClick={handleSubmit} className="btn btn-primary">
          Change Password
        </button>
        <Link to="/me">
          <button type="submit" className="btn btn-warning">
            goTo to Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
