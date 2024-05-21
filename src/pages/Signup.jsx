import Logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/Costomaxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    mutate: insert,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: async (userData) => {
      await CustomFetch.post("api/user/insert", userData)
        .then((res) => {
          // console.log(res);

          toast.success("SignUp Successfully");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const phNo = formData.get("phoneNumber");

    const ConfirmPassword = formData.get("confirmPassword");
    if (phNo.length < 10) {
      return toast.info("Phone Number should be contain 10 character");
    }
    if (password !== ConfirmPassword) {
      return toast.info("Password not matched");
    }

    if (password.length < 6) {
      return toast.info("Password should be atLeast 6 character");
    }

    const newUser = Object.fromEntries(formData);
    // console.log(newUser);
    e.currentTarget.reset();

    insert(newUser);
  };
  return (
    <div className="w-screen h-screen pb-2 bg-base-300">
      <h1 className="font-bold text-4xl text-center">
        Please create an Account
      </h1>
      <div className="flex w-screen h-full font-bold ">
        <div className="w-3/4 flex justify-center align-middle items-center flex-col gap-10 ml-8">
          <h2 className="text-5xl">Welcome to AyurBharat</h2>
          <img
            src={Logo}
            alt="err"
            width={"400px"}
            height={"400px"}
            className="rounded-3xl"
          />
          <span>
            AyurBharat is an e-commerce platform dedicated to providing a wide
            range of <br /> Ayurvedic medicines. With a focus on holistic
            wellness and natural remedies
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full w-full items-center gap-2 pt-4 pl-0"
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            className="input input-bordered w-64  h-8"
            required
          />

          <label htmlFor="age">Age: </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter age"
            className="input input-bordered w-64  h-8"
            required
          />

          <label htmlFor="dateOfBirth">Date of Birth: </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="input input-bordered w-64  h-8"
            required
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            className="input input-bordered w-64  h-8"
            required
          />

          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            className="input input-bordered w-64  h-8"
            required
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="input input-bordered w-64  h-8"
            required
          />
          {/* <input type="file" className="file-input w-64 mb-2  mt-2 max-w-xs" /> */}

          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            className="input input-bordered w-64  h-8"
            required
          />
          <span className="pt-8">
            <button
              type="submit"
              disabled={isLoading}
              style={{ width: "100px" }}
              className="btn btn-primary mr-6"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Signup"
              )}
            </button>
            <Link to="/login">
              <button
                type="button"
                disabled={isLoading}
                style={{ width: "100px" }}
                className="btn btn-success"
              >
                Login
              </button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
