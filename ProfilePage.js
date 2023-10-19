import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout>
      <h5 className="text-center">Profile Page</h5>
      <hr />
      <div className="profile-page-card">
        <diiv className="profile-image1">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
            className="profile-img"
            alt="profile"
          />
          <h1 className="profile-role">
            {user?.isAdmin === true
              ? "ADMIN"
              : user?.isDoctor === true
              ? "DOCTOR"
              : "USER"}
          </h1>
        </diiv>
        <div className="profile-data">
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-mail">{user?.email}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
