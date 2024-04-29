"use client";

import { useState } from "react";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="border-2 border-black flex">
      <div className="m-1 p-2 rounded-lg flex flex-col items-center gap-5 ">
        <div>
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="title"
            id="title"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pageNo" className="text-lg font-medium text-gray-700">
            Desc
          </label>
          <textarea
            id="pageNo"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="text-[20px] mt-11 m-2 border-2 text-center border-black bg-red-400 rounded-lg h-9 w-9">
        +
      </div> */}
    </div>
  );
}
