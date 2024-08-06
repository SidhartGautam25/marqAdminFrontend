import { useEffect, useState, useContext } from "react";
import "react-quill/dist/quill.snow.css";
// import Quill from "../quill/Quill";
import FaqSection from "../faqSection/FaqSection";
import MajorPlayers from "../majorPlayers/MajorPlayers";
// import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
// import EditorComponent from "../editor/Editor";
import MyComponent from "../editor/Editor";
import KeyMarket from "../keyMarket/KeyMarket";
import Toc from "../toc/Toc";
import OnlyEditor from "../onlyEditor/Editor";
import MSnapshot from "../mSnapshot/MSnapshot";
import ScopeReport from "../scopeReport/ScopeReport";
import KeyTrends from "../keyTrends/KeyTrends";
import CLandscape from "../cLandscape/CLandscape";
import RDevelopments from "../rDevelopments/RDevelopments";
import MOverview from "../mOverview/MOverview";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { my_admin_url } from "@/app/utility";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoSSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

const ReportEditor = () => {
  const [selectedTab, setSelectedTab] = useState("Market Snapshot");
  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [submit, setSubmit] = useState<boolean>(false);
  const tabs = [
    "Market Snapshot",
    "Market Overview",
    "Scope of the Report",
    "Key Market Trends",
    "Competitive Landscape",
    "Major Players",
    "Recent Developments",
    "FAQs",
    "Table Of Contents",
  ];

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("request sent to server");
    const local = `${my_admin_url}/api/upload/ureport`;
    try {
      const res = await axios.post(local, state);
      setSubmit(true);
      toast.success("Final submit successfully!");
      // reset added
      console.log("state before dispatch is ", state);
      dispatch({ type: "RESET" });
    } catch (err) {
      console.log("some error occured while uploadig report");
    }
  };

  return (
    <NoSSR>
      <div className="flex p-8 bg-slate-100">
        <div className="w-1/4 p-4 border border-gray-300 bg-white">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer p-2 rounded border-b border-gray-300 ${
                  selectedTab === tab ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className={`w-full py-2 my-4 px-4 ${
              submit ? "bg-green-500" : "bg-blue-600"
            } text-white rounded`}
          >
            {submit ? "All Submitted" : "All Submit"}
          </button>
          <ToastContainer />
        </div>
        <div className="w-3/4 p-4 border ml-2 border-gray-300 bg-white">
          {selectedTab === "Market Snapshot" && <MSnapshot />}
          {selectedTab === "Market Overview" && <MOverview />}
          {selectedTab === "Scope of the Report" && <ScopeReport />}
          {selectedTab === "Key Market Trends" && <KeyTrends />}
          {selectedTab === "Competitive Landscape" && <CLandscape />}
          {selectedTab === "Major Players" && <MajorPlayers />}
          {selectedTab === "Recent Developments" && <RDevelopments />}
          {selectedTab === "FAQs" && <FaqSection />}
          {selectedTab === "Table Of Contents" && <Toc />}
        </div>
      </div>
    </NoSSR>
  );
};

export default ReportEditor;
