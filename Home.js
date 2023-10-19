import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { FaUserDoctor } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertReducer";

const Home = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const getData = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.get("https://boo-app.onrender.com/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      console.log(response.data);
      setDoctors(response.data.data);
    } catch (error) {
      dispatch(hideLoading);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div className="doctors-home-icon-card">
        <FaUserDoctor className="doctor-icon-home"/>
        <h3 className="page-title">Available Doctors</h3>
      </div>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} md={12} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
