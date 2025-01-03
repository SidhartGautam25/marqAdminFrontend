"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RxDrawingPin } from "react-icons/rx";
import { RxDrawingPinFilled } from "react-icons/rx";

import { my_admin_url } from "@/app/utility";
import { useRouter } from "next/navigation";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";

const NoSSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

interface Report {
  [key: string]: any;
}

export default function Uploadrd() {
  const [reports, setReports] = useState<Report[]>([]);

  // const dev_url = "http://localhost:8800";
  // const prod_url = "https://admin-backend-1-ekoa.onrender.com";
  const [len, setLen] = useState(0);
  const [end, setEnd] = useState(1);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const router = useRouter();
  console.log("your end is ", end);
  const [page, setPage] = useState(1);

  const handleEdit = async (id: Number) => {
    const isConfirmed = confirm("Are you sure you want to edit this report ?");
    if (isConfirmed) {
      let url = `${my_admin_url}/api/getall/report?id=${id}`;
      console.log("requesting data for editing");
      // try {
      //   console.log("requesting data for editing");
      //   const data = await axios.get(url);
      //   console.log("data which we get for editing is ", data.data);
      // } catch (err) {
      //   console.log(
      //     "err we get in handleEdit while requesting from server is ",
      //     err
      //   );
      // }
      const editReport = reports.filter((report) => report._id === id);
      console.log("report to be edited is ", editReport);
      dispatch({
        type: "SET_EDITRD",
        payload: editReport[0],
      });
      router.push(`/edit/${id}`);
    }
  };

  const handleDelete = async (id: Number) => {
    const isConfirmed = confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      let url = `${my_admin_url}/api/getall/report?id=${id}`;
      try {
        const data = await axios.delete(url);
        alert("report deleted successfully");
        setReports(reports.filter((report) => report._id !== id));
      } catch (err) {}
    }
  };
  // const togglePin = (id: number) => {
  //   setReports(reports.map(item =>
  //     item.id === id ? { ...item, isPin: !item.isPin } : item
  //   ));
  // };

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

  function PinMePlease(title: string) {
    console.log("you clicked to pin this report");
    try {
      let url = `${my_admin_url}/api/getall/report/pin?title=${title}`;
      const data = axios.put(url);
      alert("report pinned successfully");
    } catch (err) {}
  }

  function UnPinMePlease(title: string) {
    console.log("you clicked to unpin this report");
    try {
      let url = `${my_admin_url}/api/getall/report/unpin?title=${title}`;
      const data = axios.put(url);
      alert("report unpinned successfully");
    } catch (err) {}
  }

  function formatDate(date: any) {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);

    return `${day}:${month}:${year}`;
  }

  useEffect(() => {
    // Code inside this function will run after every render
    // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

    // For example, you can fetch data from an API
    const fetchReport = async () => {
      console.log("fetch report called");
      let url = `${my_admin_url}/api/getall/report?page=${page}`;

      try {
        const daata = await axios.get(url);

        console.log("daata on leftb hero is ", daata.data);
        if (daata) {
          console.log("daaaaaattatatata is ", daata.data);
          setReports([...daata.data.reports]);
          setLen(daata.data.len);
          if (daata.data.len % 5 == 0) {
            setEnd(Math.floor(daata.data.len / 5));
          } else {
            setEnd(Math.floor(daata.data.len / 5 + 1));
          }
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
            <th className="w-1/12 px-4 py-2 border">Id</th>
            <th className="w-3/12 px-4 py-2 border">RD Title</th>
            <th className="w-3/12 px-4 py-2 border">Industry</th>
            <th className="w-2/12 px-4 py-2 border">Sub-Industry</th>
            <th className="w-2/12 px-4 py-2 border">Upload Date</th>
            <th className="w-2/12 px-4 py-2 border">Edit</th>
            <th className="w-1/12 px-4 py-2 border">Delete</th>
            <th className="w-1/12 px-4 py-2 border">Pin</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">
                {5 * (page - 1) + index + 1}
              </td>
              <td className="border px-4 py-2">{report.id}</td>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.industry}</td>
              <td className="border px-4 py-2">{report.subind}</td>
              <td className="border px-4 py-2 text-center">
                {formatDate(report.createdAt)}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-green-400 text-black border border-black px-2 py-1"
                  onClick={() => handleEdit(report._id)}
                >
                  Edit
                </button>
              </td>
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
