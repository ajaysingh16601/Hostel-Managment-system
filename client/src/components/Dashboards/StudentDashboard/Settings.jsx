import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiRequest } from "../../../utils/request";

function Settings() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [oldPass, setOldPass] = useState("");

  function chngPass(e) {
    setPass(e.target.value);
  }

  function chngOldPass(e) {
    setOldPass(e.target.value);
  }

  const chngPassField = {
    name: "New Password",
    type: "password",
    placeholder: "New Password",
    req: true,
    onChange: chngPass,
  };

  const chngOldPassField = {
    name: "Old Password",
    type: "password",
    placeholder: "Old Password",
    req: true,
    onChange: chngOldPass,
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("student"));
    const data = {
      email: user.email,
      password: oldPass,
      newPassword: pass,
    };
    let result = await apiRequest("auth/change-password", "POST", data);

    if (result.success) {
      navigate("/student-dashboard");
    } else {
      toast.error(result.errors[0]?.msg || "Password change failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="w-full h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mb-10 text-center">Settings</h1>
      <form method="POST" onSubmit={changePassword}>
        <div className="w-96 flex flex-col justify-between gap-5 bg-neutral-950 p-5 rounded">
          <h2 className="text-3xl text-white font-bold mb-5">
            Change Password
          </h2>
          <Input field={chngOldPassField} />
          <Input field={chngPassField} />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center"
          >
            Change Password
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </form>
    </div>
  );
}

export default Settings;
