import React, { useState } from "react";

interface Report {
  id: number;
  title: string;
  industry: string;
  subIndustry: string;
  uploadDate: string;
}

const initialReports: Report[] = [
  {
    id: 1,
    title: "Global Electric Vehicle market",
    industry: "Electric Vehicle (EV) Technology",
    subIndustry: "Electric Vehicle",
    uploadDate: "02-06-2024",
  },
  {
    id: 2,
    title: "Global Electric Vehicle market",
    industry: "Electric Vehicle (EV) Technology",
    subIndustry: "Electric Vehicle",
    uploadDate: "02-06-2024",
  },
];

export default function Uploadrd() {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const handleDelete = (id: number) => {
    const isConfirmed = confirm("Are you sure you want to delete this report?");
    if (isConfirmed) {
      setReports(reports.filter((report) => report.id !== id));
    }
  };

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="w-1/12 px-4 py-2 border">S.No.</th>
            <th className="w-3/12 px-4 py-2 border">RD Title</th>
            <th className="w-3/12 px-4 py-2 border">Industry</th>
            <th className="w-2/12 px-4 py-2 border">Sub-Industry</th>
            <th className="w-2/12 px-4 py-2 border">Upload Date</th>
            <th className="w-1/12 px-4 py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{report.title}</td>
              <td className="border px-4 py-2">{report.industry}</td>
              <td className="border px-4 py-2">{report.subIndustry}</td>
              <td className="border px-4 py-2 text-center">
                {report.uploadDate}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
