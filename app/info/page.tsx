"use client";

import Navbar from "../comp/navbar/Navbar";
// import Upload from "../comp/upload/Upload";
import Upsec from "../comp/upsec/Upsec";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="m-1 rounded-lg flex flex-col items-center">
        <button className="flex-1 bg-gray-700 text-white rounded-lg m-2 p-2 font-bold w-96">
          Update your info
        </button>
        <div className="flex gap-3 w-3/4">
          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white">
            <div className="flex flex-col px-12 py-4 gap-5">
              <div>
                <label
                  htmlFor="title"
                  className="text-lg font-medium text-gray-700"
                >
                  Study period
                </label>
                <input
                  type="title"
                  id="title"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="text-lg font-medium text-gray-700"
                >
                  Base year
                </label>
                <input
                  type="title"
                  id="title"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="text-lg font-medium text-gray-700"
                >
                  Forecost period
                </label>
                <input
                  type="title"
                  id="title"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
                />
              </div>
              <button className="btn-blue mx-2 w-1/2 self-center mt-6 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold">
                Update
              </button>
            </div>
          </div>
          <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white">
            <div className="flex flex-col px-12 py-4 gap-5">
              <div>
                <div className="text-lg font-medium text-gray-700">
                  Study period-{">"}{" "}
                  <span className="font-normal">20.10.2000-20.12.200</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-medium text-gray-700">
                  Base year-{">"} <span className="font-normal">2020</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-medium text-gray-700">
                  forecost period-{">"}{" "}
                  <span className="font-normal">21.10.2000-12.12.200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
