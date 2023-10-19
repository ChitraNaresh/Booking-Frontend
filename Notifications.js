import { Tabs } from "antd";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertReducer";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://boo-app.onrender.com/api/user/mark-all-notifications-as-seen", {
        userId: user._id,
      },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("https://boo-app.onrender.com/api/user/delete-all-notifications", {
        userId: user._id,
      },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Notify</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor mark-all" onClick={()=>markAllAsSeen()}>Mark all as seen</h1>
          </div>
          <hr/>
          {user?.unseenNotifications.length===0 && <div className="">
            <div className="empty-card">
            <img alt="" src="https://cdn3d.iconscout.com/3d/premium/thumb/empty-box-6219421-5102419.png" className="mt-2 no-data"/>
            </div>
            <h5 className="empty-text">No Unseen Messages Available!</h5>
          </div>}
          {user?.unseenNotifications.map((item) => (
            <div
              className="card p-2 mb-2 d-flex flex-row each-message"
              onClick={() => navigate(item.onClickPath)}
            >
              {/* <div className="appointment-person-name">
              {item.message.split(" ").slice(-1)}
              </div> */}
              <div className="card-text message">{item.message}.</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor mark-all" onClick={deleteAll}>Delete all</h1>
          </div>
          <hr/>
          {user?.seenNotifcations.length===0 && <div className="d-flex justify-content-center" >
          <div className="empty-card">
            <img alt="" src="https://cdn3d.iconscout.com/3d/premium/thumb/empty-box-6219421-5102419.png" className="mt-2 no-data"/>
            <h6 className="empty-text">No Seen Messages Active!</h6>
            </div>
          </div>}
          {user?.seenNotifcations.map((item) => (
            <div
              className="card p-2 mb-2 d-flex flex-row each-message"
              onClick={() => navigate(item.onClickPath)}
            >
              <div className="card-text message"><b>{item.message}</b></div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
