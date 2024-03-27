import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import Navlinks from "./Navlinks";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/User/userSlice";

const themes = {
  winter: "winter",
  sunset: "sunset",
};

const Navbar = () => {
  const user = useSelector((state) => state.userState.user);
  // console.log(user);
  const dispatch = useDispatch();
  const numItemINCart = useSelector((state) => state.cartState.numItemsInCart);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            A
          </NavLink>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <Navlinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <Navlinks />
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            <BsSunFill className="='swap-on h-4 w-4" />
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          <NavLink
            to="/cart"
            className="btn btn-ghost btn-circle btn-md hover:bg-blue-200"
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemINCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <NavLink to="/me">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user.avatar} />
                </div>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
