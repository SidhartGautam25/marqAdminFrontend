"use client";
import { Covered_By_Your_Grace } from "next/font/google";
import React from "react";
// import Image from "next/image";
// import car from "@/assests/car.jpg";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Data Suite", value: "Data Suite" },
  { label: "Insight Report", value: "Insight Report" },
  
];

interface DynamicProps {
  [key: string]: any;
}

const PdfDescription: React.FC<DynamicProps> = ({ rep }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("single");
  //console.log("dis page ", rep[curr?.cid]);
  const imageurl = rep?.linki;
  const des = rep?.desc;
  const title = rep?.title;
  const titleNew =
    title?.length > 80 ? `${rep?.title.substring(0, 80)}...` : title;
  console.log("title is ", rep);

  // const description =readmore?info: `${info.substring(0, 200)}....`;

  return (
    <div className="h-[500px] flex shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="w-1/2 px-8 flex justify-center flex-col border-2 bg-slate-50">
        <div className="w-[100px] h-[10px] bg-red-500"></div>
        <div className="my-8 font-bold text-3xl ">{title}</div>
        <div className="my-4">{des}</div>
        <div className=" border-t-2 border-gray-300 my-4 font-extralight">
          {/* <span className="my-8">Report Content</span>
          <div className="flex justify-between my-4">
            <span>Market Trends</span>
            <span>Overview</span>
            <span>Industry data</span>
          </div> */}
        </div>
        <div className="bg-blue-400 p-3 w-[10rem] text-white flex justify-center items-center rounded-sm">
          <span>April 2024</span>
        </div>
      </div>

      <div className="w-1/2 px-6 py-6 bg-blue-200">
        <div
          className="h-3/5 flex items-center justify-center"
          style={{
            backgroundImage: `url(${imageurl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <h1 className="font-bold text-3xl p-4 mix-blend-multiply">
            <div className="p-2 bg-blue-900 text-white">{titleNew}</div>
          </h1> */}
        </div>
        <div className="h-2/5 pt-2">
          <span className="text-black">Pick Your Perfect Solution</span>
          <div className="flex items-center space-x-4 mt-4">
            {options.map((option, i) => (
              <div className="" key={i}>
                <label
                  key={option.value}
                  className="flex group border-white border hover:cursor-pointer hover:border-red-300 items-center space-x-2 px-4 py-2 hover:bg-red-500"
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => setSelectedOption(option.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-red-700 group-hover:text-white">
                    {option.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-7">
            <span className="text-2xl text-blue-700 font-bold">
              $ 1,299.00 USD
            </span>
            <button className=" bg-blue-500 btn-blue  flex justify-center border-[1px] rounded border-blue-600 p-3 hover:bg-blue-700  text-white">
              Downlod Sample
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDescription;
