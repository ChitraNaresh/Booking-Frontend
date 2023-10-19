import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DoctorForm from "../../components/DoctorForm";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertReducer";
import axios from "axios";
import moment from "moment";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const {user}=useSelector(state=>state.user)
  const dispatch = useDispatch();
  const params=useParams()
  const navigate = useNavigate();
  const onFinish = async (value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/update-doctor-profile",
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
        navigate("/login");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong!");
    }
  };

  const getDoctordata = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/user/get-doctor-info-by-user-id",
        { userId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      console.log(response.data);
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
  },[]);

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialvalues={doctor}/>}
    </Layout>
  );
};

export default DoctorProfile;
