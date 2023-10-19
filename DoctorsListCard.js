import moment from "moment";
import "../index.css";

const Doctor = ({ doctor, changeDoctorStatus }) => {
  return (
    <div className="card p-2 each-card">
      <p className="data-value">
        <b>Name : </b>
        {doctor.firstName} {doctor.lastName}
      </p>
      <p className="data-value">
        <b>Phone Number : </b> {doctor.phoneNumber}
      </p>
      <p className="data-value">
        <b>Created At : </b> {moment(doctor.createdAt).format("DD-MM-YYYY")}
      </p>
      <p className="data-value">
        <b>Status : </b> {doctor.status}
      </p>
      <p className="data-value action-card">
        <b className="action-text">Action : </b>
        {doctor.status === "pending" ? (
          <>
            <button
              type="button"
              className="action-btn"
              onClick={() => changeDoctorStatus(doctor, "Approved")}
            >
              Approve
            </button>
            <button
              type="button"
              className="action-btn reject-btn"
              onClick={() => changeDoctorStatus(doctor, "Rejected")}
            >
              Reject
            </button>
          </>
        ) : (
          <span> Action taken!</span>
        )}
      </p>
    </div>
  );
};

export default Doctor;
