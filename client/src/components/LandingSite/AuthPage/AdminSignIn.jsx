// AdminSignin.jsx
import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";
import { apiRequest } from "../../../utils/request"; 

export default function AdminSignIn() {
    let navigate = useNavigate();
    const getHostel = async () => {
        let admin = JSON.parse(localStorage.getItem("admin"));
        let data = await apiRequest("admin/get-hostel", "POST", { id: admin._id });
        if (data.success) {
            localStorage.setItem("hostel", JSON.stringify(data.hostel));
        } else {
            console.error("Failed to fetch hostel data");
        }
    };

    let login = async (event) => {
        event.preventDefault();
        setLoader(true);
        let response = await apiRequest("auth/login", "POST", {
            email: inputEmail,
            password: pass,
        });

        if (response.success) {
            localStorage.setItem("token", response.data.token);
    
            let adminResult = await apiRequest("admin/get-admin", "POST", {
                isAdmin: response.data.user.isAdmin,
                token: response.data.token
            });
    
            if (adminResult.success) {
                localStorage.setItem("admin", JSON.stringify(adminResult.admin));
                await getHostel();
                navigate("/admin-dashboard");
            } else {
                toast.error(adminResult.errors[0].msg);
            }
        } else {
            toast.error(response.errors[0].msg);
        }
    
        setLoader(false);
    };

    const [loader, setLoader] = useState(false);
    const [inputEmail, setInputEmail] = useState("");
    const [pass, setPass] = useState("");

    const changeEmail = (event) => {
        setInputEmail(event.target.value);
    };
    const changePass = (event) => {
        setPass(event.target.value);
    };

    const email = {
        name: "email",
        type: "email",
        placeholder: "abc@email.com",
        req: true,
        value: inputEmail,
        onChange: changeEmail,
    };
    const password = {
        name: "password",
        type: "password",
        placeholder: "••••••••",
        req: true,
        onChange: changePass,
        value: pass,
    };

    return (
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Sign in to your account - Manager
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
            <Input field={email} />
            <Input field={password} />
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                    type="checkbox"
                    className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                    required=""
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">
                    Remember me
                    </label>
                </div>
                </div>
            </div>
            <button
                type="submit"
                className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
            >
                {loader ? (
                <>
                    <Loader /> Verifying...
                </>
                ) : (
                <span>Sign in</span>
                )}
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
            <p className="text-sm font-light text-gray-400">
                You&apos;re a student?{" "}
                <Link
                to="/auth/login"
                className="font-medium hover:underline text-blue-500"
                >
                Signin Here.
                </Link>
            </p>
            </form>
        </div>
        </div>
    );
}
