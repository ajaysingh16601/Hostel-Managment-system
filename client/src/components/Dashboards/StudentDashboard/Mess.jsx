import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiRequest } from "../../../utils/request";

function Mess() {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [requests, setRequests] = useState(0);
  const [Messoff, setMessOff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [, setRequestsList] = useState([]);
  const daysofmonthtilltoday = new Date().getDate();

  function handleLeaveChange(e) {
    setLeaveDate(e.target.value);
  }

  function handleReturnChange(e) {
    setReturnDate(e.target.value);
  }

  const leavingDate = {
    name: "leaving date",
    placeholder: "",
    req: true,
    type: "date",
    value: leaveDate,
    onChange: handleLeaveChange,
  };

  const returningDate = {
    name: "return date",
    placeholder: "",
    req: true,
    type: "date",
    value: returnDate,
    onChange: handleReturnChange,
  };

  const requestMessOff = async (event) => {
    event.preventDefault();
    setLoading(true);

    let data = {
      student: JSON.parse(localStorage.getItem("student"))._id,
      leaving_date: leaveDate,
      return_date: returnDate,
    };

    let result = await apiRequest(
      "Messoff/request",
      "POST",
      data
    );

    if (result.success) {
      setRequests(requests + 1);
      setLeaveDate("");
      setReturnDate("");
      toast.success("Mess Off Requested Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("student"));
    setLoading(true);

    if (student) {
      apiRequest("Messoff/count", "POST", {
        student: student._id,
      })
        .then((result) => {
          if (result.success) {
            setMessOff(result.approved);
            setRequests(result.list.length);
            setRequestsList(result.list);
          } else {
            alert(result.errors[0].msg);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [requests]);

  const loader = (
    <svg
      aria-hidden="true"
      className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="w-full h-screen gap-10 flex flex-col items-center justify-center max-h-screen overflow-y-auto pt-40">
      <h1 className="text-white font-bold text-5xl">Mess Off</h1>
      <ul className="flex gap-5 text-white text-xl px-5 text-center">
        <li>Total Mess: {daysofmonthtilltoday - Messoff} </li>
        <li>Mess Off: {loading ? loader : Messoff}</li>
        <li>Requests Sent: {loading ? loader : requests}</li>
      </ul>

      <form
        method="POST"
        onSubmit={requestMessOff}
        className="bg-neutral-950 py-5 px-10 rounded-lg shadow-xl w-full sm:w-auto"
      >
        <div className="flex gap-5">
          <Input field={leavingDate} />
          <Input field={returningDate} />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-xl rounded-lg px-5 py-2.5 mt-5 text-center"
        >
          {loading ? <div>{loader} Sending Request...</div> : "Request Mess off"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </div>
  );
}

export default Mess;
