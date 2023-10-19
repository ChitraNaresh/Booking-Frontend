import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertReducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, DatePicker, FloatButton, Row, TimePicker } from "antd";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const { user } = useSelector((state) => state.user);
  const [isAvailable, setAvailable] = useState(false);
  const [date, setDate] = useState("");
  const [error,setError]=useState(false)
  const [selectedTimings, setTime] = useState("");
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const checkAvailability = async () => {
    console.log(doctor);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://boo-app.onrender.com/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: selectedTimings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setAvailable(true)
      } else {
        toast.error(response.data.message);
        setAvailable(false)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error booking appointment");
    }
  };
  const bookNow = async () => {
    console.log(doctor, 121);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          date: date,
          doctorInfo: doctor,
          userInfo: user,
          time: selectedTimings,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error booking appointment");
    }
  };
  const getDoctordata = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://boo-app.onrender.com/api/user/get-doctor-info-by-doctor-id",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(response.data.data, 200);
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!doctor) {
      getDoctordata();
    }
  }, []);
  console.log(date, selectedTimings);

  const check = (value) => {
    console.log(
      `${value?.$H.toString().length < 2 ? "0" + value?.$H : value?.$H}:${
        value?.$m.toString().length < 2 ? "0" + value?.$m : value?.$m
      }`
    );
    setTime(
      `${value?.$H.toString().length < 2 ? "0" + value?.$H : value?.$H}:${
        value?.$m.toString().length < 2 ? "0" + value?.$m : value?.$m
      }`
    );
  };

  const check1 = (value) => {
    setDate(moment(value).format("DD:MM:YYYY"));
  };

  const callCheckAvailability=()=>{
    console.log(typeof(date),typeof(selectedTimings))
    if (date.length===10 && selectedTimings.length===5){
      setError(false)
      checkAvailability()
    }
    else{
      setError(true)
    }
    console.log(typeof(date),typeof(selectedTimings))
  }

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">{doctor.firstName}</h1>
          <hr />
          <h6 className="text-center mb-3">Get An Appointment..</h6>
          <Row gutter={20} align="center">
            <Col span={12} xs={24} sm={24} md={20} lg={16}>
            <div className="booking-card w-60%">
              <div>
              <p className="mb-1">
                <b>Timings : </b>
                {doctor.timings[0]} - {doctor.timings[1]}
              </p>
              <p className="data-value">
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p className="data-value">
                <b>Address : </b>
                {doctor.address}
              </p>
              <p className="data-value">
                <b>Fee per consultation : </b>
                {doctor.feePerConsultation}
              </p>
              <p className="data-value">
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column mt-3">
              {/* <Col span={12} xs={24} sm={24} md={12}> */}
             <img className="booking-image mb-3" src="https://www.inventcolabssoftware.com/blog/wp-content/uploads/2022/11/doctor-blog.png"/>
            {/* </Col> */}
                <DatePicker style={{height:"50px"}}  format="DD-MM-YYYY" onChange={check1} required rules={[{ required: true }]}/>
                <TimePicker style={{height:"50px"}} format="HH:mm" className="mt-2" onChange={check} required rules={[{ required: true }]}/>
                {error && <p className="error">*Please enter {(date.length===10) ? "time" : "date"}</p>}
                <div className="d-flex flex-column justify-content-center w-100%">
                <Button
                  className="primary-button mt-2"
                  onClick={callCheckAvailability}
                >
                  Check availability
                </Button>
                <Button disabled={!isAvailable} className="primary-button mt-2" onClick={bookNow}>
                  Book Now
                </Button>
                </div>
                </div>
                </div>
                <div>
                <img className="booking-image1 mb-3" src="https://www.inventcolabssoftware.com/blog/wp-content/uploads/2022/11/doctor-blog.png"/>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
