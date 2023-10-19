import moment from "moment";
import "../index.css";
import { useNavigate } from "react-router-dom";

const UserListCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 each-card"
      onClick={() => navigate(`https://boo-app.onrender.com/book-appointment/${doctor._id}`)}
    >
      <p className="data-value">
        <b>Name : </b> {doctor.name}
      </p>
      <p className="data-value">
        <b>Email : </b> {doctor.email}
      </p>
      <p className="data-value">
        <b>Created At : </b> {moment(doctor.createdAt).format("DD-MM-YYYY")}
      </p>
      <p className="data-value">
        <b>Action : </b> {doctor.status === "pending" ? "Rejected" : "Approved"}
      </p>
    </div>
  );
};

export default UserListCard