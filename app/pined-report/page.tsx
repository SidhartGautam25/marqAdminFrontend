"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxDrawingPin } from "react-icons/rx";
import { RxDrawingPinFilled } from "react-icons/rx";
import Navbar from "../comp/navbar/Navbar";
import RightHero from "../comp/righthero/RightHero";
import Hero from "../comp/hero/Hero";
import Link from "next/link";
import { BsPinAngle } from "react-icons/bs";
interface Report {
  _id: any;
  title: string;
  industry: string;
  subind: string;
  pin: boolean;
}
interface Insight {
  _id: number;
  title: string;
  type: string;
  industry: string;
  subIndustry: string;
  uploadDate: string;
  isPinned?: boolean;
}

const initialReport: Report[] = [
  {
    _id: 1,
    title: "How the Electric Vehicle market is booming?",
    industry: "Electric Vehicle (EV) Innovations",
    subind: "Electric Vehicles and Powertrains",
    pin: true,
  },
  {
    _id: 2,
    title: "How the Electric Vehicle market is booming?",

    industry: "Electric Vehicle (EV) Innovations",
    subind: "Electric Vehicles and Powertrains",
    pin: true,
  },
];
const Page = () => {
  const [reports, setReports] = useState<Report[]>(initialReport);

  const dev_url = "http://localhost:8800";
  const prod_url = "https://admin-backend-1-ekoa.onrender.com";
  const [len, setLen] = useState(0);
  const [end, setEnd] = useState(1);
  console.log("your end is ", end);
  const [page, setPage] = useState(1);

  const handleDelete = async (id: Number) => {
    const isConfirmed = confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      let url = `${dev_url}/api/getall/report?id=${id}`;
      try {
        const data = await axios.delete(url);
        alert("report deleted successfully");
      } catch (err) {}
    }
  };
  function PinMePlease(title: string) {
    console.log("you clicked to pin this report");
    try {
      let url = `${dev_url}/api/getall/report/pin?title=${title}`;
      const data = axios.put(url);
    } catch (err) {}
  }

  function UnPinMePlease(title: string) {
    console.log("you clicked to unpin this report");
    try {
      let url = `${dev_url}/api/getall/report/unpin?title=${title}`;
      const data = axios.put(url);
    } catch (err) {}
  }

  useEffect(() => {
    // Code inside this function will run after every render
    // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

    // For example, you can fetch data from an API
    const fetchReport = async () => {
      console.log("fetch report called");
      let url = `${dev_url}/api/getall/pinned-report`;

      try {
        const daata = await axios.get(url);

        if (daata) {
          console.log("daaaaaattatatata is ", daata.data);
          setReports([...daata.data.reports]);
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
    <>
      <Navbar />
      <div className="flex rounded-lg mt-10">
        <Link
          href="/uploding-insight"
          className=" btn-blue mx-2 w-1/2  font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
        >
          <button className="">Upload New insights</button>
        </Link>
        <Link
          href="/uploding"
          className="btn-blue mx-2 w-1/2 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
        >
          <button>Upload New Report</button>
        </Link>
        <Link
          href="/pined-report"
          className="gap-4 items-center btn-blue mx-2 w-1/2 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
        >
          <button>Pined Reports</button>
          <BsPinAngle className="text-xl" />
        </Link>
        <Link
          href="/info"
          className="btn-blue mx-2 w-1/2 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
        >
          <button>Update info</button>
        </Link>
      </div>
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
              <th className="w-1/12 px-4 py-2 border">Pin</th>
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
                    onClick={() => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-400 text-black border border-black px-2 py-1 text-xl"
                    // onClick={() => togglePin(index)}
                  >
                    {report.pin ? (
                      <div onClick={() => UnPinMePlease(report.title)}>
                        <RxDrawingPinFilled />
                      </div>
                    ) : (
                      <div onClick={() => PinMePlease(report.title)}>
                        <RxDrawingPin />
                      </div>
                    )}
                    {/* {reports.isPin ? (
                    <RxDrawingPinFilled />
                  ) : (
                    <RxDrawingPin />
                  )} */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
