import React from "react";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Form, Col, Row, Input, TimePicker, Button } from "antd";
import "../components/layout.css";
import { showLoading, hideLoading } from "../redux/alertReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const onFinish = async (value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://boo-app.onrender.com/api/user/apply-doctor-account",
        {
          ...value,
          userId: user.id,
          timings:[
            moment(value.timings[0]).format("HH:mm"),
            moment(value.timings[1]).format("HH:mm")
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
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
      <h1 className="page-title">Apply Doctor</h1>
      <hr />
      <Form
      layout="vertical"
      onFinish={onFinish}
      // initialValues={{...initialvalues,
      //  timings:[
      //   moment(initialvalues?.timings[0],"HH:mm"),
      //   moment(initialvalues?.timings[1],"HH:mm"),
      //  ]
      // }}
    >
      <h1 className="card-title">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title">Professonal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Specializaton"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specializaton" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Fee Per Consultation"
            name="feePerConsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="fee Per Consultation" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm"/>
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
    </Layout>
  );
};

export default ApplyDoctor;
