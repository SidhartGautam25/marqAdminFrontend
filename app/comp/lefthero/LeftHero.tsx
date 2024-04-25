import { Fragment, useState } from "react";

export default function LeftHero() {
  const [opt, setOpt] = useState<string>("report");
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpt(e.target.value);
  };
  const dataBlag: string[] = ["fgbfgb", "dffdb", "bvfgb", "bfgb", "fbfdb"];
  const dataReport: string[] = ["dfbfb", "rd", "rd", "rd", "rd"];
  return (
    <>
      <div className=" flex-[1] bg-gray-50 text-xl border-2 border-black rounded-lg py-2">
        <div className="rounded-md flex justify-center">
          <select
            name=""
            id=""
            value={opt}
            onChange={handleOnChange}
            className="w-[95%] bg-gray-700 text-white rounded-sm p-3 hover:bg-gray-800 mb-2"
          >
            <option value="blog">Blog</option>
            <option value="report">Reports</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          {opt === "blog" ? (
            dataBlag.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="blogs w-[95%] border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
                    {item}
                  </div>
                </Fragment>
              );
            })
          ) : (
            <span></span>
          )}
          {opt === "report" ? (
            dataReport.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="report w-[95%] border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
                    {item}
                  </div>
                </Fragment>
              );
            })
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
}
