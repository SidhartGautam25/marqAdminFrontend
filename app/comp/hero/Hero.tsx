"use client";
import LeftHero from "../lefthero/LeftHero";
import RightHero from "../righthero/RightHero";
import { Fragment, useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { ReportContext, ReportContextType } from "@/app/context/reportContext";

axios.defaults.withCredentials = true;

export default function Hero() {
  const [reports, setReports] = useState<Record<string, any>[]>([]);
  const [dup, setDup] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    // Code inside this function will run after every render
    // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

    // For example, you can fetch data from an API
    const fetchReport = async () => {
      console.log("fetch report called");
      try {
        const daata = await axios.get(
          "https://marq-admin-backend.onrender.com/api/getall/report"
        );
        console.log("daata on leftb hero is ", daata.data);
        if (daata) {
          setReports([...daata.data]);
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
  }, []); // The second argument of useEffect is an optional array of dependencies

  return (
    <>
      <div className="flex m-2 rounded-xl p-2 gap-4 ">
        {/* <LeftHero reports={reports} /> */}
        <RightHero reports={reports} />
      </div>
    </>
  );
}
