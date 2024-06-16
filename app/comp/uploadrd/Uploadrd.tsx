import React, { useEffect, useState } from "react";
import axios from "axios";

interface Report {
  title: string;
  industry: string;
  subind: string;
}

export default function Uploadrd() {
  const [reports, setReports] = useState<Report[]>([]);
  const dev_url = "http://localhost:8800";
  const prod_url = "https://admin-backend-1-ekoa.onrender.com";
  const [len, setLen] = useState<Number>(0);

  const handleDelete = () => {
    // const isConfirmed = confirm("Are you sure you want to delete this report?");
    // if (isConfirmed) {
    //   setReports(reports.filter((report) => report.id !== id));
    // }
  };

  useEffect(() => {
    // Code inside this function will run after every render
    // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

    // For example, you can fetch data from an API
    const fetchReport = async () => {
      console.log("fetch report called");
      let url = `${dev_url}/api/getall/report`;

      try {
        const daata = await axios.get(url);

        console.log("daata on leftb hero is ", daata.data);
        if (daata) {
          console.log("daaaaaattatatata is ", daata);
          setReports([...daata.data.reports]);
          setLen(daata.data.len);
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
  }, []);

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
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.industry}</td>
              <td className="border px-4 py-2">{report.subind}</td>
              <td className="border px-4 py-2 text-center">May 2024</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
