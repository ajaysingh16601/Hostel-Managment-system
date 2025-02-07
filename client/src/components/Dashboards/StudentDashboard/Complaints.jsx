import { useEffect, useState, useCallback } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../../../utils/request";

function Complaints() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");
  const [regComplaints, setRegComplaints] = useState([]);

  const types = ["Electric", "Furniture", "Cleaning", "Others"];

  const registerComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);
    let student = JSON.parse(localStorage.getItem("student"));
    try {
      const res = await apiRequest("complaint/register", "POST", {
        student: student._id,
        hostel: student.hostel,
        title,
        description: desc,
        type,
      });
      if (res.success) {
        toast.success("Complaint Registered Successfully!");
        setTitle("");
        setDesc("");
        setType("Electric");
        fetchComplaints();
      } else {
        toast.error(res.errors || "Failed to register complaint");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  const fetchComplaints = useCallback(async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    try {
      const res = await apiRequest("complaint/student", "POST", { student: student._id });
      if (res.complaints) {
        setRegComplaints(
          res.complaints.map((complaint) => ({
            ...complaint,
            date: new Date(complaint.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          }))
        );
      }
    } catch (error) {
      toast.error("Failed to fetch complaints");
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center px-10 max-h-screen overflow-y-auto pt-80">
      <h1 className="text-white font-bold text-5xl mt-10">Complaints</h1>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <form onSubmit={registerComplaint} className="md:w-96 w-full py-5 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5">
          <label className="block mb-2 text-sm font-medium text-white">Your complaint type</label>
          <select className="border rounded-lg block w-full p-2.5 bg-gray-700 text-white" onChange={(e) => setType(e.target.value)} value={type}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <Input field={{ name: "complaint title", placeholder: "Title", req: true, type: "text", value: title, onChange: (e) => setTitle(e.target.value) }} />
          <label className="block mb-2 text-sm font-medium text-white">Your complaint description</label>
          <textarea
            placeholder="Details of complaint"
            className="border rounded-lg block w-full p-2.5 bg-gray-700 text-white"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg px-5 py-2.5 mt-5" disabled={loading}>
            {loading ? "Registering Complaint..." : "Register Complaint"}
          </button>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </form>
        <div className="w-full md:w-80 max-w-md p-4 border rounded-lg shadow bg-neutral-950 text-white overflow-y-auto">
          <h5 className="text-xl font-bold mb-4">Registered Complaints</h5>
          <ul className="divide-y divide-gray-700">
            {regComplaints.length === 0 ? (
              <p>No complaints registered</p>
            ) : (
              regComplaints.map((complain) => (
                <li key={complain.title} className="py-3 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {complain.status.toLowerCase() === "pending" ? (
                      <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{complain.title}</p>
                    <p className="text-sm text-gray-400">{complain.date}</p>
                  </div>
                  <p className="text-base font-semibold">{complain.type}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
