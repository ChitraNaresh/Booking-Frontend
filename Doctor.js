import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 each-card"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title doctor-name">{doctor.firstName}</h1>
      <hr />
      <p className="data-value">
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p className="data-value">
        <b>Address : </b>
        {doctor.address}
      </p>
      <p className="data-value">
        <b>Fee per consultation : </b>
        {doctor.feePerConsultation}
      </p>
      <p className="data-value">
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
};

export default Doctor;
