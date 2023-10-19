import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";
import "./layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { CiCircleRemove } from "react-icons/ci";

const Layout = ({ children }) => {
  const [isLogout, setLogout] = useState(false);
  const location = useLocation();
  const [isShow, setShow] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user,1001)
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <AiOutlineHome className="icon" />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FiUsers className="icon" />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <HiOutlineUserGroup className="icon" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiUserCircle className="icon" />,
    },
  ];
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <AiOutlineHome className="icon" />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <MdOutlineMedicalServices className="icon" />,
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: <FiUserPlus className="icon" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiUserCircle className="icon" />,
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <AiOutlineHome className="icon" />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <MdOutlineMedicalServices className="icon" />,
    },
    {
      name: "Profile",
      path: `/doctors/profile/${user?._id}`,
      icon: <BiUserCircle className="icon" />,
    },
  ];
  const menuToBeRender = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const callNoLogout = () => {
    setLogout((prevState) => !prevState);
  };
  return (
    <div className="main">
      <div className={`logout-card ${isLogout ? "d-block" : "d-none"}`}>
        <div className="buttons-card">
          <CiCircleRemove
            className="popup-remove-icon"
            onClick={callNoLogout}
          />
          <div className="buttons-container">
            <button
              type="button"
              className="yes-btn log-check-btn"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Yes Logout
            </button>
            <button
              type="button"
              className="no-btn log-check-btn"
              onClick={callNoLogout}
            >
              No Logout
            </button>
          </div>
        </div>
      </div>
      <div className="layout d-flex">
        <div className={`sidebar ${!isShow && "d-flex"}`}>
          <div className="side-sub-card">
            <div className="app-logo">
              <img
                src="https://thumbs.dreamstime.com/z/medical-app-online-doctor-vector-icon-eps-file-easy-to-edit-237026474.jpg"
                className="app-logo1"
              />
            </div>
            {menuToBeRender.map((item) => (
              <div
                className={`menu-items-card ${
                  location.pathname === item.path && "active-menu-item"
                }`}
              >
                <Link to={item.path}>{item.icon}</Link>
                {isShow && (
                  <Link to={item.path} className="menu-link">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div
              className={`menu-items-card ${
                location.pathname === "/logout" && "active-menu-item"
              }`}
              // onClick={() => {
              //   localStorage.clear();
              //   navigate("/login");
              // }}
              onClick={() => setLogout((prevState) => !prevState)}
            >
              {/* <Link to="/logout">
              <BiLogOutCircle className="icon" />
            </Link> */}
              <BiLogOutCircle className="icon" />
              {isShow && (
                // <Link to="/logout" className="menu-link">
                //   Logout
                // </Link>
                <h3 className="menu-link mb-0">Logout</h3>
              )}
            </div>
          </div>
          <h3 className="role">{role}</h3>
        </div>
        <div className="content">
          <div className="header">
            {isShow ? (
              <CiMenuKebab
                className="show-icon"
                onClick={() => setShow(false)}
              />
            ) : (
              <FcMenu onClick={() => setShow(true)} className="show-icon" />
            )}
            <div className="contact-card">
              <Badge
                count={user?.unseenNotifications.length}
                className="badges"
                onClick={() => navigate("/notifications")}
              >
                <IoIosNotificationsOutline className="notify-icon" />
              </Badge>
              <p className="user-name">{user?.name}</p>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
