import React from "react";
import "../index.css";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertReducer";

const DoctorAppointmentsCard = ({ doctor ,getAppointmentsData}) => {
  const dispatch=useDispatch()
  console.log(doctor)
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://boo-app.onrender.com/api/admin/change-appointment-status",
        { appointmentId: record._id,status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="card p-2 each-card">
      <p className="data-value">
        <b>Patient : </b>
        {doctor.userInfo.name}
      </p>
      <p className="data-value">
        <b>Phone Number : </b>
        {doctor.doctorInfo.phoneNumber}
      </p>
      <p className="data-value">
        <b>Date & Time : </b>
        {moment(doctor.date).format("DD-MM-YY")} &{" "}
        {moment(doctor.time).format("HH:mm")}
      </p>
      <p className="data-value">
        <b>Statue : </b>
        {doctor?.status}
      </p>
      <p className="data-value action-card">
        <b className="action-text">Action : </b>
        {doctor.status === "pending" ? (
          <>
              <button
              type="button"
              className="action-btn"
                onClick={() => changeAppointmentStatus(doctor, "Approved")}
              >
                 Approve
              </button>
              <button
              type="button"
              className="action-btn reject-btn"
                onClick={() => changeAppointmentStatus(doctor, "Rejected")}
              >
                 Reject
              </button>
              </>
          ) : <div> Action taken!</div>}
      </p>
    </div>
  );
};

export default DoctorAppointmentsCard