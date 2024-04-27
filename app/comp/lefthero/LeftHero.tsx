import { Fragment, useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { ReportContext, ReportContextType } from "@/app/context/reportContext";

export default function LeftHero({ reports }) {
  // let [state, setState] = useState({
  //   items: Array.from({ length: 10 }),
  // });

  // const fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     setState({
  //       items: state.items.concat(Array.from({ length: 10 })),
  //     });
  //   }, 1500);
  // };

  const [opt, setOpt] = useState<string>("report");
  //const [reports, setReports] = useState([]);
  const { state, dispatch } = useContext(ReportContext) as ReportContextType;
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpt(e.target.value);
  };

  // useEffect(() => {
  //   // Code inside this function will run after every render
  //   // You can perform side effects, such as data fetching, subscriptions, or DOM manipulations here

  //   // For example, you can fetch data from an API
  //   const fetchReport = async () => {
  //     console.log("fetch report called");
  //     try {
  //       const daata = await axios.get(
  //         "http://localhost:8800/api/getall/report"
  //       );
  //       console.log("daata on leftb hero is ", daata);
  //       if (daata) {
  //         setReports([...daata.data]);
  //       }
  //     } catch (err) {}
  //   };
  //   fetchReport();

  //   // You can also return a cleanup function from useEffect
  //   // This cleanup function will be executed before the component is unmounted or re-rendered
  //   return () => {
  //     // Code inside this cleanup function will run before the component is unmounted or re-rendered
  //     // You can perform cleanup tasks here, such as unsubscribing from subscriptions or clearing timers
  //   };
  // }, []); // The second argument of useEffect is an optional array of dependencies

  // const dataBlag: string[] = ["fgbfgb", "dffdb", "bvfgb", "bfgb", "fbfdb"];
  // const dataReport: string[] = ["dfbfb", "rd", "rd", "rd", "rd"];

  function rclickfun(i) {
    console.log("obj under rclickfun is ");
    console.log(i);
    dispatch({ type: "SET_CURRENT", payload: { iid: i } });
  }

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
          // <InfiniteScroll
          //   dataLength={state.items.length}
          //   next={fetchMoreData}
          //   hasMore={true}
          //   loader={<h4>Loading...</h4>}
          // >
          //   {state.items.map((i, index) => (
          //     <Fragment key={index}>
          //       <div className=" report w-[350px] border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
          //         The Estée Lauder Companies and Microsoft increase
          //         collaboration to power prestige beauty with generative AI -{" "}
          //         {index + 1}
          //       </div>
          //     </Fragment>
          //   ))}
          // </InfiniteScroll>
          <div></div>
        ) : (
          <span></span>
        )}
        {opt === "report" ? (
          // <InfiniteScroll
          //   dataLength={state.items.length}
          //   next={fetchMoreData}
          //   hasMore={true}
          //   loader={<h4>Loading...</h4>}
          // >
          //   {state.items.map((i, index) => (
          //     <Fragment key={index}>
          //       <div className=" report w-[350px] flex justify-center  border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200">
          //         Latest News, Live Updates Today April 26, 2024: For many,
          //         Friday’s polling brings a long weekend getaway - {index + 1}
          //       </div>
          //     </Fragment>
          //   ))}
          // </InfiniteScroll>
          <div>
            {reports.map((obj, i) => (
              <div
                className=" report w-[350px] flex justify-center  border-[1px] border-gray-600 hover:bg-gradient-to-r from-blue-900 to-black mb-2 p-3 hover:text-white text-center rounded-sm hover:cursor-pointer ease-in duration-200"
                key={i}
                onClick={() => rclickfun(i)}
              >
                {obj.title}
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
