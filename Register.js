import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertReducer";

const Register = () => {
  const [isPassword,setPassword]=useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const onFinish = async (value) => {
    console.log(value);
    try {
      dispatch(showLoading())
      const response = await axios.post("https://boo-app.onrender.com/api/user/register", value);
      dispatch(hideLoading())
      console.log(response, response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch(hideLoading())
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form cards">
        <div className="p-2 d-flex justify-content-center"> <img src="https://thumbs.dreamstime.com/z/medical-app-online-doctor-vector-icon-eps-fi
        le-easy-to-edit-237026474.jpg" className="app-logo1"/></div>
        <h5 className="text-center">SignUp</h5>
        <Form layout="vertical" onFinish={onFinish} className="w-100%">
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <div className="d-flex password-card">
            <Input placeholder="password" type={isPassword ? "text" : "password"} className="password-input"/>
            {!isPassword ? <AiFillEyeInvisible className="eye-icon" onClick={()=>setPassword(true)}/>:
            <AiFillEye className="eye-icon"  onClick={()=>setPassword(false)}/>}
            </div>
          </Form.Item>
          <div className="d-flex flex-column">
          <Button className="primary-button" htmlType="submit">
            SignUp
          </Button>
          <Link to="/login" className="anchor">
            <span className="text-dark">Already have an account?</span> Login
          </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
