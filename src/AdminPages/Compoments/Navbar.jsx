import { Link, useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { CustomFetch } from "../../axios/Costomaxios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/User/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    navigate("/");
    dispatch(logoutUser());
  };
  return (
    <div className="navbar bg-gray-400">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 h-screen gap-4 font-bold"
          >
            <li>
              <Link className="text-2xl" to="/admin">
                <MdDashboardCustomize />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <MdOutlineProductionQuantityLimits />
                Products Details
              </Link>
            </li>
            <li>
              <Link to="/admin/add_product">
                <MdOutlineProductionQuantityLimits />
                Add Products
              </Link>
            </li>
            <li>
              <Link to="view_orders">
                <MdPayments /> Orders
              </Link>
            </li>
            <li>
              <Link to="users">
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link to="reviews">
                <MdOutlinePreview /> Reviews
              </Link>
            </li>
            <li>
              <Link to="view_appointment">
                <TbBrandBooking /> Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl">
          <RiAdminFill /> Admin DashBoard
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-secondary" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};
export default Navbar;
