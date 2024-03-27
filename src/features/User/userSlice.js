import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CustomFetch } from "../../axios/Costomaxios";
import { useNavigate } from "react-router-dom";

const themes = {
  winter: "winter",
  sunset: "sunset",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.token };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");

      const logout = async (req, res) => {
        CustomFetch("/api/user/logout")
          .then((res) => {
            toast.success("Logged out successfully");
          })
          .catch((err) => {
            console.log("error", err);
            toast.success("Logged out unsuccessfully");
          });
      };
      logout();
    },
    editProfile: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    toggleTheme: (state) => {
      const { winter, sunset } = themes;
      state.theme = state.theme === winter ? sunset : winter;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme, editProfile } =
  userSlice.actions;

export default userSlice.reducer;
