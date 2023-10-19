import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertReducer";
import axios from "axios";
import { Row,Col, Table } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import DoctorsListCard from "../../components/DoctorsListCard"

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("https://boo-app.onrender.com/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.data) {
        setDoctors(response.data.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record,status) => {
    console.log(23)
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/admin/change-doctor-status",
      {doctorId:record._id,userId:record.userId,status:status},
       {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message)
          getDoctorsData()
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("Something went wrong!")
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h6>
          {record.firstName} {record.lastName}
        </h6>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
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
            <h6 className="anchor" onClick={()=>changeDoctorStatus(record,"approved")}>Approve</h6>
          ) : (
            <h6 className="anchor" onClick={()=>changeDoctorStatus(record,"blocked")}>Block</h6>
          )}
        </div>
      ),
    },
  ];
  return (
    // <Layout>
    //   <h1 className="page-title">Doctorss List</h1>
    //   <Table columns={columns} dataSource={doctors} />
    // </Layout>
    <Layout>
      <div className="doctors-home-icon-card">
        {/* <FaUserDoctor className="doctor-icon-home"/> */}
        <h3 className="page-title">Doctors List</h3>
      </div>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} md={12} lg={8}>
            <DoctorsListCard doctor={doctor} changeDoctorStatus={changeDoctorStatus}/>
          </Col>
        ))}
      </Row>
      </Layout>
  );
};

export default DoctorsList;
