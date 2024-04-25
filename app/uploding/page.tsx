"use client";

import Upload from "../comp/upload/Upload";

export default function Home() {
  return (
    <div className="m-1 rounded-lg flex flex-col items-center">
      <button className="flex-1 bg-gray-700 text-white rounded-lg m-2 p-2 font-bold w-96">
        Upload your Table of Content
      </button>
      <div className="">
        <Upload />
      </div>
    </div>
  );
}
