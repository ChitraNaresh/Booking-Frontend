import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/alertReducer";
import axios from "axios";
import { Col, Row, Table } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import AppointmentsCard from "../components/AppointmentsCard"

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
  
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get("https://boo-app.onrender.com/api/admin/get-appointments-by-user-id", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.data);
        if (response.data.data) {
          setAppointments(response.data.data);
        }
        dispatch(hideLoading());
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };
    useEffect(() => {
        getAppointmentsData();
      }, []);
      // const columns = [
      //   // {
      //   //     title:"Id",
      //   //     dataIndex:"_id"
      //   // },
      //   {
      //     title: "Doctor",
      //     dataIndex: "name",
      //     render: (text, record) => (
      //       <h6>
      //         {record.doctorInfo.firstName}
      //       </h6>
      //     ),
      //   },
      //   {
      //     title: "Phone",
      //     dataIndex: "phoneNumber",
      //     render: (text, record) => (
      //       <h6>
      //         {record.doctorInfo.phoneNumber}
      //       </h6>
      //     ),
      //   },
      //   {
      //       title: "Date & Time",
      //       dataIndex: "createdAt",
      //       render: (text, record) => (
      //         <h6>
      //           {moment(record.date).format("DD-MM-YY")} {moment(record.time).format("HH:mm")}
      //         </h6>
      //       ),
      //     },
      //   {
      //     title: "status",
      //     dataIndex: "status",
      //   },
      // ];
  return (
  //   <Layout>
  //   <h1 className="page-title">Appointments</h1>
  //   <Table columns={columns} dataSource={appointments} />
  // </Layout>
  <Layout>
      <div className="doctors-home-icon-card">
        {/* <FaUserDoctor className="doctor-icon-home"/> */}
        <h3 className="page-title">Apppointments</h3>
      </div>
      <Row gutter={20}>
        {appointments.map((doctor) => (
          <Col span={8} xs={24} sm={24} md={12} lg={8}>
            <AppointmentsCard doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Appointments