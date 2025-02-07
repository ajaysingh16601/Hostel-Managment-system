import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import { apiRequest } from "../../../utils/request";

function Invoices() {
  const genInvoices = async () => {
    setProgress(30);
    let hostel = JSON.parse(localStorage.getItem("hostel"));
    try {
      const data = await apiRequest("invoice/generate", "POST", { hostel: hostel._id });
      setProgress(60);
      if (data.success) {
        toast.success("Invoices generated successfully!", { theme: "dark" });
        getInvoices();
      } else {
        toast.error(data.errors, { theme: "dark" });
      }
    } catch (err) {
      toast.error("Something went wrong!", { theme: "dark" });
    }
    setProgress(100);
  };

  const approveInvoice = async (id) => {
    setProgress(30);
    try {
      const data = await apiRequest("invoice/update", "POST", { student: id, status: "approved" });
      setProgress(60);
      if (data.success) {
        toast.success("Invoice approved successfully!", { theme: "dark" });
        getInvoices();
      } else {
        toast.error("Something went wrong!", { theme: "dark" });
      }
    } catch (err) {
      toast.error("Something went wrong!", { theme: "dark" });
    }
    setProgress(100);
  };

  const getInvoices = async () => {
    setProgress(30);
    let hostel = JSON.parse(localStorage.getItem("hostel"));
    try {
      const data = await apiRequest("invoice/getbyid", "POST", { hostel: hostel._id });
      setProgress(60);
      if (data.success) {
        setAllInvoices(data.invoices);
        setPendingInvoices(data.invoices.filter((invoice) => invoice.status === "pending"));
      } else {
        toast.error(data.errors, { theme: "dark" });
      }
    } catch (err) {
      toast.error("Something went wrong!", { theme: "dark" });
    }
    setProgress(100);
  };

  const [Progress, setProgress] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, [allInvoices.length, pendingInvoices.length]);

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <LoadingBar color='#0000FF' progress={Progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">Invoices</h1>
      <button onClick={genInvoices} className="py-3 px-7 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-800 transition-all">
        Generate Invoices
      </button>
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">All Invoices</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {pendingInvoices.length === 0
            ? "No Students Found"
            : pendingInvoices.map((invoice) => (
                <li className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:scale-105 transition-all" key={invoice.id}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{invoice.student.name}</p>
                      <p className="text-sm truncate text-gray-400">Room: {invoice.student.room_no} | Amount: Rs. {invoice.amount}</p>
                    </div>
                    <button className="group/show relative z-0" onClick={() => approveInvoice(invoice.student._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover/show:scale-125 group-hover/show:text-green-600 transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm hidden absolute px-2 -right-10 top-6 bg-black text-center group-hover/show:block rounded">Approve Payment</span>
                    </button>
                  </div>
                </li>
              ))}
        </ul>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="dark" />
    </div>
  );
}

export default Invoices;
