"use client";
import Link from "next/link";
import Sidebtn from "../sidebtn/Sidebtn";
import Pdfren from "../pdfren/Pdfren";
import { useState, useContext } from "react";
import { ReportContext, ReportContextType } from "@/app/context/reportContext";

interface ChildComponentProps {
  reports: Record<string, any>[];
}

const RightHero: React.FC<ChildComponentProps> = ({ reports }) => {
  const { state, dispatch } = useContext(ReportContext) as ReportContextType;
  console.log("state in right hero is ", state);

  return (
    <>
      <div className=" flex-[3]">
        <div className="flex rounded-lg">
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
        </div>

        <div className=" min-h-[40rem] rounded-lg m-2 flex-[3]">
          <Pdfren reports={reports} />
        </div>
      </div>
    </>
  );
};
export default RightHero;
