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
export default function Sidebtn() {
  const [isAboutReportOpen, setIsAboutReportOpen] = useState<boolean>(false);

  const toggleAboutReport = () => {
    setIsAboutReportOpen(!isAboutReportOpen);
  };
  return (
    <div className="flex flex-col w-64 p-4">
      <button
        className="text-md font-semibold text-gray-900 mb-4 flex justify-between items-center w-full text-left"
        onClick={toggleAboutReport}
      >
        ABOUT THIS REPORT
        <span>{isAboutReportOpen ? "-" : "+"}</span>
      </button>
      {isAboutReportOpen &&
        reportSections.map((section) => (
          <div key={section.name}>
            <div className="mb-2 last:mb-0 px-3 py-1 rounded text-gray-700 hover:bg-gray-100">
              {section.name}
            </div>
          </div>
        ))}
      <h2 className="text-md font-semibold text-gray-900 mt-4 mb-2 cursor-pointer">
        TABLE OF CONTENTS
      </h2>
      <h2 className="text-md font-semibold text-gray-900 mt-4 mb-2 cursor-pointer">
        SCOPE OF THE REPORT
      </h2>
      <h2 className="text-lg font-semibold text-gray-900 mt-4 mb-2 cursor-pointer">
        Frequently Asked Questions
      </h2>
      <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        Download PDF
      </button>
    </div>
  );
}
