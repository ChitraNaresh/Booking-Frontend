import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertReducer";
import axios from "axios";
import {Col, Row, Table } from "antd";
import moment from "moment";
import UserListCard from "../../components/UsersListCard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("https://boo-app.onrender.com/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.data) {
        setUsers(response.data.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: () => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      ),
    },
  ];
  return (
    // <Layout>
    //   <h1 className="page-title">Users List</h1>
    //   <Table columns={columns} dataSource={users} />
    // </Layout>
    <Layout>
      <div className="doctors-home-icon-card">
        {/* <FaUserDoctor className="doctor-icon-home"/> */}
        <h3 className="page-title">Users List</h3>
      </div>
      <Row gutter={20}>
        {users.map((doctor) => (
          <Col span={8} xs={24} sm={24} md={12} lg={8}>
            <UserListCard doctor={doctor} />
          </Col>
        ))}
      </Row>
      </Layout>
  );
};

export default UsersList;
