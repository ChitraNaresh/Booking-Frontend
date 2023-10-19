import React, { useEffect } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import axios from "axios";
import { setUser} from "../redux/userSlice";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,reloadUser } = useSelector((state) => state.user);
  console.log(user)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          "https://boo-app.onrender.com/api/user/get-user-info-by-id",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data)
        if (response.data.success) {
          dispatch(setUser(response.data.data));
        } else {
          localStorage.clear()
          navigate("/login");
        }
      } catch (error) {
        localStorage.clear()
        navigate("/login");
      }
    };
    if (!user) {
      getUser();
    }
    console.log(10,user)
  }, [user,reloadUser]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
