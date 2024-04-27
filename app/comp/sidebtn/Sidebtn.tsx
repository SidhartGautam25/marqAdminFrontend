import React, { useState } from "react";
interface Section {
  name: string;
}
const reportSections: Section[] = [
  { name: "Market Snapshot" },
  { name: "Market Overview" },
  { name: "Key Market Trends" },
  { name: "Competitive Landscape" },
  { name: "Major Players" },
  { name: "Recent Developments" },
];
const btnStyle="strap hover:font-semibold hover:bg-blue-50 flex justify-between items-center p-4 ease-in duration-400 hover:cursor-pointer hover:border-b border-blue-500";
const btnStyle2="strap flex pl-2 justify-between items-center ease-in duration-400  hover:border-b border-blue-500 hover:font-medium hover:cursor-pointer";

export default function Sidebtn() {
  const [isAboutReportOpen, setIsAboutReportOpen] = useState<boolean>(false);

  const toggleAboutReport = () => {
    setIsAboutReportOpen(!isAboutReportOpen);
  };
  return (
    <div className=" bg-slate flex flex-col w-64 p-4 border-2 h-full">
      <button
        className={btnStyle}
        onClick={toggleAboutReport}
      >
        ABOUT THIS REPORT
        <span>{isAboutReportOpen ? "-" : "+"}</span>
      </button>
      {isAboutReportOpen &&
        reportSections.map((section) => (
          <div key={section.name} className="p-2 pl-8 bg-slate-50 ">
            <div className={btnStyle2}>
              {section.name}
            </div>
          </div>
        ))}
      <h2 className={btnStyle}>
        TABLE OF CONTENTS
      </h2>
      <h2 className={btnStyle}>
        SCOPE OF REPORT
      </h2>
      <h2 className={btnStyle}>
        FAQs
      </h2>
      <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        Download PDF
      </button>
    </div>
  );
}
