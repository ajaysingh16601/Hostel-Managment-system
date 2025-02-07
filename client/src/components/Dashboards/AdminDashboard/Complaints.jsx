import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../../../utils/request";

function Complaints() {
  const [unsolvedComplaints, setComplaints] = useState([]);
  const [ setResolvedComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const getComplaints = async () => {
    try {
      const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
      const data = await apiRequest("complaint/hostel", "POST", { hostel });

      if (data.success) {
        const complaints = data.complaints.map((complaint) => ({
          id: complaint._id,
          type: complaint.type,
          title: complaint.title,
          desc: complaint.description,
          student: complaint.student?.name,
          room: complaint.student?.room_no,
          status: complaint.status,
          date: new Date(complaint.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        }));

        setAllComplaints(complaints);
        setResolvedComplaints(complaints.filter((c) => c.status.toLowerCase() !== "pending"));
        setComplaints(complaints.filter((c) => c.status.toLowerCase() === "pending"));

        updateGraphData(complaints);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const dismissComplaint = async (id) => {
    try {
      const data = await apiRequest("complaint/resolve/", "POST", { id });

      if (data.success) {
        toast.success("Complaint Dismissed", { autoClose: 2000 });

        setComplaints((prev) => prev.filter((c) => c.id !== id));
        setResolvedComplaints((prev) => [...prev, ...allComplaints.filter((c) => c.id === id)]);
      } else {
        toast.error("Something went wrong", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error dismissing complaint:", error);
    }
  };

  const updateGraphData = (complaints) => {
    const pastWeekDates = [...Array(7)].map((_, i) =>
      new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    ).reverse();

    const counts = pastWeekDates.map(
      (date) => complaints.filter((complaint) => complaint.date === date).length
    );

    setGraphData(counts);
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-10 pt-32 items-center justify-center overflow-auto">
      <h1 className="text-white font-bold text-5xl">Complaints</h1>

      <div className="flex flex-wrap justify-center gap-7">
        <div className="flex items-center justify-center md:h-64 h-40 md:w-96 w-full">
          <Line
            data={{
              labels: [...Array(7)].map((_, i) =>
                new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              ).reverse(),
              datasets: [{ label: "No. of Complaints", data: graphData, pointHoverBackgroundColor: "orange" }],
            }}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>

        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-96 max-h-64 overflow-auto">
          <span className="text-white font-bold text-xl">New Complaints</span>
          <ul className="divide-y divide-gray-700 text-white">
            {unsolvedComplaints.length === 0 ? (
              <li className="py-3 px-5">No new complaints!</li>
            ) : (
              unsolvedComplaints.map((complaint) => (
                <li key={complaint.id} className="py-3 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all">
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-7 h-7 text-white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{complaint.title}</p>
                      <p className="text-sm truncate text-gray-400">{complaint.desc}</p>
                    </div>
                    <button className="hover:underline hover:text-green-600" onClick={() => dismissComplaint(complaint.id)}>
                      Solved
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />
    </div>
  );
}

export default Complaints;
