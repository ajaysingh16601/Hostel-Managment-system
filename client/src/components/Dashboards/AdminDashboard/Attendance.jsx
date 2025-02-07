import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllStudents } from "../../../utils";
import { apiRequest } from "../../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar';

function Attendance() {
  const getALL = async () => {
    setProgress(30);
    
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const markedData = await apiRequest("attendance/getHostelAttendance", "POST", { hostel });

    setProgress(50);
    const markedStudents = markedData.attendance.map((student) => ({
      id: student.student._id,
      cms: student.student.cms_id,
      name: student.student.name,
      room: student.student.room_no,
      attendance: student.status === "present",
    }));

    setProgress(70);
    setMarkedStudents(markedStudents);

    const data = await getAllStudents();
    const students = data.students;

    const unmarkedStudents = students.filter(
      (student) => !markedStudents.find((markedStudent) => markedStudent.id === student._id)
    ).map((student) => ({
      id: student._id,
      cms: student.cms_id,
      name: student.name,
      room: student.room_no,
      attendance: undefined,
    }));

    setProgress(90);
    setunmarkedStudents(unmarkedStudents);
    setProgress(100);
  };

  const [progress, setProgress] = useState(0);
  const [unmarkedStudents, setunmarkedStudents] = useState([]);
  const [markedStudents, setMarkedStudents] = useState([]);

  const markAttendance = async (id, isPresent) => {
    const response = await apiRequest("attendance/mark", "POST", { 
      student: id, 
      status: isPresent ? "present" : "absent" 
    });

    if (response.success) {
      toast.success("Attendance Marked Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    unmarkedStudents.find((student) => student.id === id).attendance = isPresent;
    setunmarkedStudents(unmarkedStudents.filter((student) => student.attendance === undefined));
    setMarkedStudents((markedStudents) =>
      markedStudents.concat(unmarkedStudents.filter((student) => student.attendance !== undefined))
    );
  };

  const [present, setPresent] = useState(0);

  useEffect(() => {
    getALL();
    setPresent(markedStudents.filter((student) => student.attendance === true).length);
  }, [unmarkedStudents.length, markedStudents.length]);

  let date = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labels = ["Present", "Absentees", "Unmarked Students"];
  const graph = (
    <div className="flex flex-row-reverse items-center gap-3 h-64">
      <Doughnut
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              label: "No. of Students",
              data: [present, markedStudents.length - present, unmarkedStudents.length],
              backgroundColor: ["#1D4ED8", "#F26916", "#808080"],
              borderColor: "rgba(0,0,0,0)",
              hoverOffset: 10,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
        }}
      />
      <ul className="text-white">
        <li className="flex gap-2">
          <span className="w-10 h-5 bg-orange-500 block"></span> Absent
        </li>
        <li className="flex gap-2">
          <span className="w-10 h-5 bg-blue-500 block"></span> Present
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center overflow-auto max-h-screen">
      <LoadingBar color="#0000FF" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">Attendance</h1>
      <p className="text-white text-xl mb-10">Date: {date}</p>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        {graph}
        <div className="flow-root md:w-[400px] w-full bg-neutral-950 px-7 py-5 rounded-lg shadow-xl max-h-[250px] overflow-auto">
          <span className={`font-bold text-xl text-white ${unmarkedStudents.length ? "block" : "hidden"}`}>
            Unmarked Students
          </span>
          <ul className="divide-y divide-gray-700 text-white">
            {unmarkedStudents.length === 0
              ? "All students are marked!"
              : unmarkedStudents.map((student) =>
                  student.attendance === undefined ? (
                    <li className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 transition-all" key={student.id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">{student.name}</p>
                          <p className="text-sm truncate text-gray-400">
                            {student.cms} | Room: {student.room}
                          </p>
                        </div>
                        <button
                          className="hover:text-green-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.id, true)}
                        >
                          ✅
                        </button>
                        <button
                          className="hover:text-red-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.id, false)}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ) : (
                    ""
                  )
                )}
          </ul>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} pauseOnHover theme="dark" />
    </div>
  );
}

export default Attendance;
