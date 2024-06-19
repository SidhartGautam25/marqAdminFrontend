import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxDrawingPin } from "react-icons/rx";
import { RxDrawingPinFilled } from "react-icons/rx";
interface Report {
  title: string;
  industry: string;
  subind: string;
}

export default function Uploadrd() {
  const [reports, setReports] = useState<Report[]>([]);
  const dev_url = "http://localhost:8800";
  const prod_url = "https://admin-backend-1-ekoa.onrender.com";
  const [len, setLen] = useState(0);
  const [end, setEnd] = useState(1);
  console.log("your end is ", end);
  const [page, setPage] = useState(1);

  const handleDelete = (id: Number) => {
    const isConfirmed = confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      // setReports(reports.filter((report) => report.id !== id));
    }
  };

  function next() {
    if (page < end) {
      setPage(page + 1);
    }
  }
  function prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    // Code inside this function will run after every render
    // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

    // For example, you can fetch data from an API
    const fetchReport = async () => {
      console.log("fetch report called");
      let url = `${dev_url}/api/getall/report?page=${page}`;

      try {
        const daata = await axios.get(url);

        console.log("daata on leftb hero is ", daata.data);
        if (daata) {
          console.log("daaaaaattatatata is ", daata.data);
          setReports([...daata.data.reports]);
          setLen(daata.data.len);
          setEnd(Math.floor(daata.data.len / 5 + 1));
        }
      } catch (err) {}
    };
    fetchReport();

    // You can also return a cleanup function from useEffect
    // This cleanup function will be executed before the component is unmounted or re-rendered
    return () => {
      // Code inside this cleanup function will run before the component is unmounted or re-rendered
      // You can perform cleanup tasks here, such as unsubscribing from subscriptions or clearing timers
    };
  }, [page]);

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="w-1/12 px-4 py-2 border">S.No.</th>
            <th className="w-3/12 px-4 py-2 border">RD Title</th>
            <th className="w-3/12 px-4 py-2 border">Industry</th>
            <th className="w-2/12 px-4 py-2 border">Sub-Industry</th>
            <th className="w-2/12 px-4 py-2 border">Upload Date</th>
            <th className="w-1/12 px-4 py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">
                {5 * (page - 1) + index + 1}
              </td>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.industry}</td>
              <td className="border px-4 py-2">{report.subind}</td>
              <td className="border px-4 py-2 text-center">May 2024</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  // onClick={() => handleDelete(report._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`flex justify-center gap-5 items-center mt-5`}>
        <button className=" bg-blue-800 text-white p-2 w-[5rem]" onClick={prev}>
          PREV
        </button>
        <span className="">
          {page} To {end}
        </span>
        <button className="bg-blue-800 text-white p-2 w-[5rem]" onClick={next}>
          NEXT
        </button>
      </div>
    </div>
  );
}
