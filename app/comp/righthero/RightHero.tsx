import Link from "next/link";
import Sidebtn from "../sidebtn/Sidebtn";
import Pdfren from "../pdfren/Pdfren";
import { useState, useContext } from "react";
import { ReportContext, ReportContextType } from "@/app/context/reportContext";

export default function RightHero({ reports }) {
  const { state, dispatch } = useContext(ReportContext) as ReportContextType;
  console.log("state in right hero is ", state);

  return (
    <>
      <div className=" flex-[3]">
        <div className="border-2 border-black flex rounded-lg">
          <Link
            href="/uploding"
            className="flex-1 bg-gray-700 text-white rounded-lg m-2 p-2 font-bold text-center"
          >
            <button>Upload New Blogs</button>
          </Link>
          <Link
            href="/uploding"
            className="flex-1  bg-gray-700 text-white rounded-lg m-2 p-2 font-bold text-center"
          >
            <button>Upload New Report</button>
          </Link>
        </div>
        <div className="border-2 border-black min-h-[40rem] flex rounded-lg mt-2">
          <div className="border-2 border-black min-h-[40rem] rounded-lg m-2 flex-[1]">
            <div className="border-2 border-black min-h-[40rem] rounded-lg m-2 flex-[3]">
              <Pdfren reports={reports} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
