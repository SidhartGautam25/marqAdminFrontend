// components/InsightTable.tsx
import React, { useState } from "react";
import { RxDrawingPin } from "react-icons/rx";
import { RxDrawingPinFilled } from "react-icons/rx";
interface Insight {
  id: number;
  title: string;
  type: string;
  industry: string;
  subIndustry: string;
  uploadDate: string;
}

const initialInsights: Insight[] = [
  {
    id: 1,
    title: "How the Electric Vehicle market is booming?",
    type: "Blog",
    industry: "Electric Vehicle (EV) Innovations",
    subIndustry: "Electric Vehicles and Powertrains",
    uploadDate: "02-06-2024",
  },
  {
    id: 2,
    title: "How the Electric Vehicle market is booming?",
    type: "Article",
    industry: "Electric Vehicle (EV) Innovations",
    subIndustry: "Electric Vehicles and Powertrains",
    uploadDate: "02-06-2024",
  },
];

export default function Uploadinsight() {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [pined, setPined] = useState<number>();
  const handleDelete = (id: number) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this insight?"
    );
    if (isConfirmed) {
      setInsights(insights.filter((insight) => insight.id !== id));
    }
  };
  const setpin = (id: number) => {
     setPined(id);
 };

  return (
    <div className="overflow-x-auto m-5">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="w-1/12 px-4 py-2 border">S.No.</th>
            <th className="w-3/12 px-4 py-2 border">Insight Title</th>
            <th className="w-2/12 px-4 py-2 border">Insight Type</th>
            <th className="w-2/12 px-4 py-2 border">Industry</th>
            <th className="w-2/12 px-4 py-2 border">Sub-Industry</th>
            <th className="w-2/12 px-4 py-2 border">Upload Date</th>
            <th className="w-1/12 px-4 py-2 border">Delete</th>
            <th className="w-1/12 px-4 py-2 border">Pin</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight, index) => (
            <tr key={insight.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{insight.title}</td>
              <td className="border px-4 py-2 text-center">{insight.type}</td>
              <td className="border px-4 py-2">{insight.industry}</td>
              <td className="border px-4 py-2">{insight.subIndustry}</td>
              <td className="border px-4 py-2 text-center">
                {insight.uploadDate}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  onClick={() => handleDelete(insight.id)}
                >
                  Delete
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-red-400 text-black border border-black px-2 py-1"
                  onClick={() => setpin(insight.id)}
                >
                  {pined===insight.id?<RxDrawingPinFilled />:<RxDrawingPin/>}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`flex justify-center gap-5 items-center mt-5`}>
        <button className=" bg-blue-800 text-white p-2 w-[5rem]">PREVIES</button>
        <span className="">1 To 50</span>
        <button className="bg-blue-800 text-white p-2 w-[5rem]">NEXT</button>
      </div>
    </div>
  );
}
