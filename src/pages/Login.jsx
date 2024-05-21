import { useState } from "react";
import { toast } from "react-toastify";
import {
  LoginStyle,
  Container,
  From,
  Image,
  Reset,
  Role,
  LoginFrom,
} from "../styles/login";
import LoginImg from "../assets/Login4.png";
import { CustomFetch } from "../axios/Costomaxios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loginUser } from "../features/User/userSlice";
import store from "../store";

export const action = (store, user, setRole, navigate) => async () => {
  try {
    const res = await CustomFetch.post("/api/user/login", user);

    store.dispatch(loginUser(res.data));
    if (user.role === res.data.role) {
      if (res.data.success) {
        toast.success(`${res.data.message}`);
        setRole(res.data.role);
        if (res.data.role === "admin") {
          return navigate("/admin");
        }
        navigate("/");
      } else {
        return toast.info(`${res.data.message}`);
      }
    }
  } catch (error) {
    console.log(error);
    // const errorMessage =
    // error?.res.data.message || "please double check your credentials";
    toast.error("please double check your credentials");
    // console.log(error);
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const user = { ...data, role };
    await action(store, user, setRole, navigate)();
  };
  return (
    <Container>
      <Helmet>
        <title>AyurBharat --- Login</title>
        <meta name="signIn" content="indian ayurveda Please Login" />
      </Helmet>
      <Role onClick={() => setRole(role === "admin" ? "user" : "admin")}>
        {role}
      </Role>

      <LoginStyle>
        <Image src={LoginImg} alt="Err" />
        <From>
          <h1 className="text-3xl font-bold">Welcome to AyurBharat</h1>
          <LoginFrom onSubmit={handleSubmit}>
            <label htmlFor="username">Username or Email : </label>
            <input
              type="text"
              name="UsernameOrEmail"
              id="username"
              placeholder="Username or Email"
              required
            />
            <label htmlFor="password">Password : </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder={`Enter your password `}
              required
            />

            {/* <button className="btn btn-square w-full lg:w-44">
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button> */}

            <button type="submit">Login</button>
          </LoginFrom>
          {role === "user" && (
            <>
              <Reset>
                <Link to="/forgetPassword"> Reset Password</Link>
              </Reset>
              <span style={{ marginTop: "10px" }}>
                I don't have an account?
                <Reset className="sign-up">
                  <Link to="/signup"> SignUp</Link>
                </Reset>
              </span>
            </>
          )}
        </From>
      </LoginStyle>
    </Container>
  );
};
export default Login;
