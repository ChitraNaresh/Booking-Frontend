import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertReducer";
import axios from "axios";
import { Table,Row,Col } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import DoctorAppointmentsCard from "../../components/DoctorAppointmentsCard";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/admin/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data, 200);
      if (response.data.data) {
        setAppointments(response.data.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-appointment-status",
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
  useEffect(() => {
    getAppointmentsData();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <h6>{record.userInfo.name}</h6>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <h6>{record.doctorInfo.phoneNumber}</h6>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <h6>
          {moment(record.date).format("DD-MM-YY")}{" "}
          {moment(record.time).format("HH:mm")}
        </h6>
      ),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <div>
              <h6
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "Approved")}
              >
                Approve
              </h6>
              <h6
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "Rejected")}
              >
                Reject
              </h6>
            </div>
          ) : <div>Action taken!</div>}
        </div>
      ),
    },
  ];
  return (
    // <Layout>
    //   <h1 className="page-title">Appointments</h1>
    //   <Table columns={columns} dataSource={appointments} />
    // </Layout>
    <Layout>
      <div className="doctors-home-icon-card">
        {/* <FaUserDoctor className="doctor-icon-home"/> */}
        <h3 className="page-title">Available Patients</h3>
      </div>
      <Row gutter={20}>
        {appointments.map((doctor) => (
          <Col span={8} xs={24} sm={24} md={12} lg={8}>
            <DoctorAppointmentsCard doctor={doctor} getAppointmentsData={getAppointmentsData}/>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default DoctorAppointments;
