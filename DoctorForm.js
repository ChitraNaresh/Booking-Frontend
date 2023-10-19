import { Col, Row, TimePicker, Form, Button, Input } from "antd";
import moment from "moment";
import React from "react";

const DoctorForm = ({ onFinish, initialvalues }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialvalues,
        ...(initialvalues && {
          timings: [
            moment(initialvalues?.timings[0], "HH:mm"),
            moment(initialvalues?.timings[1], "HH:mm"),
          ],
        }),
      }}
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
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default DoctorForm;
