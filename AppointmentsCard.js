import React from "react";
import "../index.css";
import moment from "moment";

const Doctor = ({ doctor }) => {
  return (
    <div className="card p-2 each-card">
      <p className="data-value">
        <b>Doctor : </b>
        {doctor.doctorInfo?.firstName} {doctor.doctorInfo?.lastName}
      </p>
      <p className="data-value">
        <b>Phone Number : </b>
        {doctor.doctorInfo?.phoneNumber}
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
    </div>
  );
};

export default Doctor;
