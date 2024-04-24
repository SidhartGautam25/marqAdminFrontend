"use client";

import { useState } from "react";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [pageNo, setPageNo] = useState("");

  return (
    <div className="m-1 p-2 rounded-lg flex items-center gap-5 border-2 border-black">
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
          PageNo
        </label>
        <input
          type="pageNo"
          id="pageNo"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400"
          value={pageNo}
          onChange={(e) => setPageNo(e.target.value)}
        />
      </div>
      <div className="text-5xl mt-6">+</div>
    </div>
  );
}
