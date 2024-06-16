"use client";

import Navbar from "../comp/navbar/Navbar";
import Upins from "../comp/upins/Upins";
// import Upload from "../comp/upload/Upload";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="m-1 rounded-lg flex flex-col items-center bg-slate-100">
        <button className="flex-1 bg-gray-700 text-white rounded-lg m-2 p-2 font-bold w-96">
          Upload Your Insights
        </button>
        <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-[50%] bg-white">
          {/* <Upload /> */}
          <Upins />
        </div>
      </div>
    </>
  );
}
