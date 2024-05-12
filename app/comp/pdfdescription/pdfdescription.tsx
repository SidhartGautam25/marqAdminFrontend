import { Covered_By_Your_Grace } from "next/font/google";
import React from "react";
// import Image from "next/image";
// import car from "@/assests/car.jpg";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "Single", value: "single" },
  { label: "Team", value: "team" },
  { label: "Corporate", value: "corporate" },
];

export default function PdfDescription({ rep }) {
  const [selectedOption, setSelectedOption] = React.useState<string>("single");
  //console.log("dis page ", rep[curr?.cid]);
  const imageurl = rep?.linki;
  const des = rep?.desc;
  const title = rep?.title;
  const titleNew =title?.length > 80?`${rep?.title.substring(0, 80)}...`:title ;
  console.log("title is ", rep);

  // const description =readmore?info: `${info.substring(0, 200)}....`;


  return (
    <div className="h-[500px] flex">
      <div className="w-1/2 px-8 flex justify-center flex-col border-2">
        <div className="w-[100px] h-[10px] bg-red-500"></div>
        <div className="my-8 font-bold text-3xl ">{title}</div>
        <div className="my-4">{des}</div>
        <div className=" border-t-2 border-gray-300 my-4 font-extralight">
          <span className="my-8">Report Content</span>
          <div className="flex justify-between my-4">
            <span>Market Trends</span>
            <span>Overview</span>
            <span>Industry data</span>
          </div>
        </div>
      </div>
      <div className="w-1/2 px-6 py-6 bg-[#1F2937]">
        <div className="h-3/5 flex items-center justify-center" style={{backgroundImage: `url(${imageurl})`,backgroundSize:'cover',backgroundRepeat: 'no-repeat'}}>
          <h1 className="font-bold text-3xl p-4 mix-blend-multiply">
            <div className=" bg-blue-400">{titleNew}</div>
          </h1>
        </div>
        <div className="h-2/5 pt-2">
          <span className="text-white">Choose your best option</span>
          <div className="flex items-center space-x-4 mb-4">
            {options.map((option) => (
              <div className="">
                <label
                  key={option.value}
                  className="flex group border-white border hover:border-red-300 items-center space-x-2 px-4 py-2 hover:bg-red-500"
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

          <span className="text-xl text-white">$ 1,299.00 USD</span>

          <div className="my-2 flex">
            <button className="btn-blue mx-2 w-32  flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-semibold">
              BUY NOW
            </button>
            <button className="btn-blue mx-2 w-52  flex justify-center border-[1px] rounded border-red-500 p-3 hover:bg-red-500 text-red-500 hover:text-white hover:font-semibold">
              Download Free Sample
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex">
    //   {/* title description and date side */}
    //   <div className="px-16 w-1/2 flex justify-center flex-col border-2">
    //
    //   </div>
    //   {/* //image and pricing side */}
    //   <div className="w-1/2 group relative border-2 overflow-hidden  ">
    //
    //
    //
    //       <div className="p-16">
    //         <span>Choose your best option</span>
    //         <div className="flex items-center space-x-4 mb-4">
    //           {options.map((option) => (
    //             <div className="">
    //               <label
    //                 key={option.value}
    //                 className="flex border border-black hover:border-red-300 items-center space-x-2 px-4 py-2 text-xl hover:bg-red-500"
    //               >
    //                 <input
    //                   type="radio"
    //                   value={option.value}
    //                   checked={selectedOption === option.value}
    //                   onChange={() => setSelectedOption(option.value)}
    //                   className="text-blue-600 focus:ring-blue-500 border-gray-300"
    //                 />
    //                 <span className="text-gray-700">{option.label}</span>
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //         <span className="text-2xl">$ 1,299.00 USD</span>
    //         <div className="my-8 flex">
    //           <button className="btn-blue mx-2 w-32  font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold">
    //             BUY NOW
    //           </button>
    //           <button className="btn-blue mx-2 w-52  font-semibold flex justify-center border-[1px] rounded border-red-500 p-3 hover:bg-red-500 text-red-500 hover:text-white hover:font-bold">
    //             Download Free Sample
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
