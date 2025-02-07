import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import { getAllStudents } from "../../../../utils";
import { toast } from "react-toastify";
import { apiRequest } from "../../../../utils/request";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const [noOfStudents, setNoOfStudents] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [messReqs, setMessReqs] = useState([]);

  const getStudentCount = async () => {
    const res = await getAllStudents();
    if (res.success) {
      setNoOfStudents(res.students.length);
    }
  };

  const getComplaints = async () => {
    try {
      const response = await apiRequest("complaint/hostel", "POST", { hostel: hostel._id });
      if (response.success) {
        setComplaints(response.complaints);
      } else {
        toast.error("Something failed");
      }
    } catch (error) {
      toast.error("Error fetching complaints");
    }
  };

  const getSuggestions = async () => {
    try {
      const response = await apiRequest("suggestion/hostel", "POST", { hostel: hostel._id });
      if (response.success) {
        setSuggestions(response.suggestions.filter(s => s.status === "pending"));
      } else {
        toast.error("Something failed");
      }
    } catch (error) {
      toast.error("Error fetching suggestions");
    }
  };

  const getRequests = async () => {
    try {
      const response = await apiRequest("messoff/list", "POST", { hostel: hostel._id });
      if (response.success) {
        const updatedList = response.list.map((req) => ({
          id: req._id,
          from: new Date(req.leaving_date).toDateString().slice(4, 10),
          to: new Date(req.return_date).toDateString().slice(4, 10),
          title: `${req.student.name} [ Room: ${req?.student.room_no}]`,
          desc: `${req?.from} to ${req.to}`,
        }));
        setMessReqs(updatedList);
      }
    } catch (error) {
      toast.error("Error fetching mess requests");
    }
  };

  useEffect(() => {
    getRequests();
    getStudentCount();
    getComplaints();
    getSuggestions();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center max-h-screen overflow-x-hidden overflow-y-auto pt-[400px] sm:pt-96 md:pt-96 lg:pt-80 xl:pt-20">
      <h1 className="text-white font-bold text-5xl text-center">
        Welcome <span className="text-blue-500">{admin?.name || "admin"}!</span>
      </h1>
      <h1 className="text-white text-xl">Manager, {hostel?.name || "hostel"}</h1>
      <div className="flex w-full gap-5 sm:px-20 pt-5 flex-wrap items-center justify-center">
        <ShortCard title="Total Students" number={noOfStudents} />
        <ShortCard title="Total Complaints" number={complaints?.length} />
        <ShortCard title="Total Suggestions" number={suggestions?.length} />
      </div>
      <div className="w-full flex gap-5 sm:px-20 h-80 flex-wrap items-center justify-center">
        <List list={messReqs} title="mess" />
        <List list={suggestions} title="suggestions" />
      </div>
    </div>
  );
}

export default Home;
