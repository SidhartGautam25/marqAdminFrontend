// components/InsightTable.tsx

import React, { useEffect, useState } from "react";
import { RxDrawingPin } from "react-icons/rx";
import { RxDrawingPinFilled } from "react-icons/rx";

import axios from "axios";
import { my_admin_url } from "@/app/utility";
interface Insight {
  _id: number;
  title: string;
  type: string;
  industry: string;
  subIndustry: string;
  uploadDate: string;
  isPinned?: boolean;
}

const initialInsights: Insight[] = [
  {
    _id: 1,
    title: "How the Electric Vehicle market is booming?",
    type: "Blog",
    industry: "Electric Vehicle (EV) Innovations",
    subIndustry: "Electric Vehicles and Powertrains",
    uploadDate: "02-06-2024",
  },
  {
    _id: 2,
    title: "How the Electric Vehicle market is booming?",
    type: "Article",
    industry: "Electric Vehicle (EV) Innovations",
    subIndustry: "Electric Vehicles and Powertrains",
    uploadDate: "02-06-2024",
  },
];

export default function Uploadinsight() {
  const [pined, setPined] = useState<number>();
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<Insight[]>([]);
  const [len, setLen] = useState(1);
  const [end, setEnd] = useState(1);
  console.log("blogs here", blogs);
  const handleDelete = async (id: Number) => {
    const isConfirmed = confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      let url = `${my_admin_url}/api/getall/delete/blog?id=${id}`;
      try {
        const data = await axios.delete(url);
        alert("report deleted successfully");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (err) {}
    }
  };
  const togglePin = (id: number) => {
    setBlogs(
      blogs.map((item) =>
        item._id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
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
      let url = `${my_admin_url}/api/getall/blogs?page=${page}`;

      try {
        const daata = await axios.get(url);

        console.log("daata on leftb hero is ", daata.data);
        if (daata) {
          console.log("daaaaaattatatata is ", daata.data);
          setBlogs([...daata.data.blogs]);
          setLen(daata.data.len);
          let temp = Math.floor(daata.data.len / 5 + 1);
          setEnd(temp);
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
            <th className="w-3/12 px-4 py-2 border">Insight Title</th>
            <th className="w-2/12 px-4 py-2 border">Insight Type</th>
            <th className="w-2/12 px-4 py-2 border">Industry</th>
            <th className="w-2/12 px-4 py-2 border">Sub-Industry</th>
            <th className="w-2/12 px-4 py-2 border">Upload Date</th>
            <th className="w-1/12 px-4 py-2 border">Delete</th>
            <th className="w-1/12 px-4 py-2 border">Pin</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((insight, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{insight.title}</td>
              <td className="border px-4 py-2 text-center">{insight.type}</td>
              <td className="border px-4 py-2">{insight.industry}</td>
              <td className="border px-4 py-2">{insight.subIndustry}</td>
              <td className="border px-4 py-2 text-center">
                {insight.uploadDate}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  onClick={() => handleDelete(insight._id)}
                >
                  Delete
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1 text-xl"
                  onClick={() => togglePin(insight._id)}
                >
                  {insight.isPinned ? <RxDrawingPin /> : <RxDrawingPinFilled />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`flex justify-center gap-5 items-center mt-5`}>
        <button className=" bg-blue-800 text-white p-2 w-[5rem]" onClick={prev}>
          PREVIES
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
