import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function LeftHero() {
  let [state, setState] = useState({
    items: Array.from({ length: 10 }),
  });

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setState({
        items: state.items.concat(Array.from({ length: 10 })),
      });
    }, 1500);
  };

  const [opt, setOpt] = useState<string>("report");
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpt(e.target.value);
  };
  // const dataBlag: string[] = ["fgbfgb", "dffdb", "bvfgb", "bfgb", "fbfdb"];
  // const dataReport: string[] = ["dfbfb", "rd", "rd", "rd", "rd"];
  return (
   
      <div className="  flex-[1] bg-gray-50 text-xl border-2 border-red-600 rounded-lg py-2">
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
        <div className="overflow-scroll h-[700px] border-2 border-blue-900 flex flex-col items-center ">
          {opt === "blog" ? (
            <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {state.items.map((i, index) => (
              <Fragment key={index}>
                <div className=" report w-[350px] border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
                The Estée Lauder Companies and Microsoft increase collaboration to power prestige beauty with generative AI - {index+1}
                </div>
              </Fragment>
            ))}
          </InfiniteScroll>
          ) : (
            <span></span>
          )}
          {opt === "report" ? (
            <InfiniteScroll
              dataLength={state.items.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {state.items.map((i, index) => (
                <Fragment key={index}>
                  <div className=" report w-[350px] flex justify-center  border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
                  Latest News, Live Updates Today April 26, 2024: For many, Friday’s polling brings a long weekend getaway - {index+1}
                  </div>
                </Fragment>
              ))}
            </InfiniteScroll>
          ) : (
            <span></span>
          )}
        </div>
      </div>
   
  );
}
