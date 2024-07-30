import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "../quill/Quill";
import FaqSection from "../faqSection/FaqSection";
import MajorPlayers from "../majorPlayers/MajorPlayers";
// import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
// import EditorComponent from "../editor/Editor";
import MyComponent from "../editor/Editor";
import KeyMarket from "../keyMarket/KeyMarket";
import Toc from "../toc/Toc";

const ReportEditor = () => {
  const [selectedTab, setSelectedTab] = useState("Market Snapshot");

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

  return (
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
      </div>
      <div className="w-3/4 p-4 border ml-2 border-gray-300 bg-white">
        {selectedTab === "Market Snapshot" && <MyComponent />}
        {selectedTab === "Market Overview" && <Quill />}
        {selectedTab === "Scope of the Report" && <Quill />}
        {selectedTab === "Key Market Trends" && <KeyMarket />}
        {selectedTab === "Competitive Landscape" && <Quill />}
        {selectedTab === "Major Players" && <MajorPlayers />}
        {selectedTab === "Recent Developments" && <Quill />}
        {selectedTab === "FAQs" && <FaqSection />}
        {selectedTab === "Table Of Contents" && <Toc />}
      </div>
    </div>
  );
};

export default ReportEditor;
