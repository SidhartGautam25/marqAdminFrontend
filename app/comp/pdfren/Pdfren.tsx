"use client";
import { Worker } from "@react-pdf-viewer/core";
import Image from "next/image";
import left from "@/public/left-chevron.png";
import right from "@/public/right-chevron.png";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useState, useContext } from "react";
import { ReportContext, ReportContextType } from "@/app/context/reportContext";

// Import styles
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import Sidebtn from "../sidebtn/Sidebtn";
import PdfDescription from "../pdfdescription/pdfdescription";
import exp from "constants";

interface ChildComponentProps {
  reports: Record<string, any>[];
}

const Pdfren: React.FC<ChildComponentProps> = ({ reports }) => {
  const bookmarkPluginInstance = bookmarkPlugin();
  const { Bookmarks } = bookmarkPluginInstance;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [currentpage, setCurrentpage] = useState(0);
  const { state, dispatch } = useContext(ReportContext) as ReportContextType;
  console.log("we are at pdf ren");
  console.log("reports ");
  console.log(reports);
  console.log("state ");
  console.log(state);
  console.log("reports cid ", reports[state.cid]);
  const [bar, setbar] = useState<boolean>(false);
  console.log("state cid is ", state.cid);
  const pdfurl = reports[state?.cid]?.linkp;
  // console.log("pdfrul is ", pdfurl);
  console.log("reports 0 is ", reports[0]?.linkp);
  const repos = reports[state?.cid];
  console.log("we are on pdfren repos ", repos);
  console.log(typeof repos);

  const handleGoToSection = () => {
    // Calculate the position of the specific section on the page
    // For example, if you want to scroll to 50% of the page, you can set it like this
    const position = (currentpage + 1) * window.innerHeight * 0.5; // 50% of the page height

    // Scroll to the calculated position
    window.scrollTo(0, position);
  };
  return (
    <div className="flex">
      {/* <Bookmarks /> */}
      {bar ? (
        <Image
          src={left}
          alt="left icon"
          className="h-[30px] w-[30px] self-center ease-in duration-300"
          onClick={() => setbar(!bar)}
        />
      ) : (
        <Image
          src={right}
          alt=""
          className="h-[30px] w-[30px] self-center ease-in duration-300"
          onClick={() => setbar(!bar)}
        />
      )}
      {bar && (
        <div>
          {" "}
          <Sidebtn />
        </div>
      )}
      <div className="w-full overflow-scroll h-[680px]">
        <div className="">
          <PdfDescription rep={repos} />
        </div>
        <div className="border w-auto">
          {/* {state.cid && reports ? `${reports[state.cid].link1}` : "nothing"} */}
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={
                pdfurl
                  ? pdfurl
                  : "https://res.cloudinary.com/dkzpbucfz/image/upload/v1713940823/pics/lu1fo2x4kk4v9qmd5r6s.pdf"
              }
              // fileUrl="https://res.cloudinary.com/dkzpbucfz/image/upload/v1713940823/pics/lu1fo2x4kk4v9qmd5r6s.pdf"
              initialPage={currentpage}
              onPageChange={({ currentPage }) => setCurrentpage(currentPage)}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default Pdfren;
