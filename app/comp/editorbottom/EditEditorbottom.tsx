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
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import RelatedReport from "../relatedReport/RelatedReport";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import EditMSnapshot from "../mSnapshot/EditMSnapshot";
import EditMOverview from "../mOverview/EditMOverview";
import EditScopeReport from "../scopeReport/EditScopeReport";
import EditKeyTrends from "../keyTrends/EditKeyTrends";
import EditCLandscape from "../cLandscape/EditCLandscape";
import EditMajorPlayers from "../majorPlayers/EditMajorPlayers";
import EditRDevelopments from "../rDevelopments/EditRDevelopments";
import EditFaqSection from "../faqSection/EditFaqSection";
import EditToc from "../toc/EditToc";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

const EditEditorbottom = () => {
  console.log("on editEditorBottom component");
  const [selectedTab, setSelectedTab] = useState("Market Snapshot");
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState(false);
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
    "Related Reports",
  ];

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("request sent to server");
    const local = `${my_admin_url}/api/upload/ureport`;
    try {
      console.log("state before submitting is ", state);
      const res = await axios.put(local, state);
      setSubmit(true);
      // toast.success("Final submit successfully!");
      // reset added
      console.log("state before dispatch is ", state);
      //   dispatch({ type: "RESET" });
      editdispatch({
        type: "CHANGE_EDIT_COND",
        payload: {
          first: true,
          one: true,
          two: true,
          three: true,
          four: true,
          five: true,
          six: true,
          seven: true,
          eight: true,
          nine: true,
          ten: true,
          final: true,
        },
      });
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
            {submit ? "Submitted" : "Submit"}
          </button>
          {/* <ToastContainer /> */}
        </div>
        <div className="w-3/4 p-4 border ml-2 border-gray-300 bg-white">
          {selectedTab === "Market Snapshot" && <EditMSnapshot />}
          {selectedTab === "Market Overview" && <EditMOverview />}
          {selectedTab === "Scope of the Report" && <EditScopeReport />}
          {selectedTab === "Key Market Trends" && <EditKeyTrends />}
          {selectedTab === "Competitive Landscape" && <EditCLandscape />}
          {selectedTab === "Major Players" && <EditMajorPlayers />}
          {selectedTab === "Recent Developments" && <EditRDevelopments />}
          {selectedTab === "FAQs" && <EditFaqSection />}
          {selectedTab === "Table Of Contents" && <EditToc />}
          {selectedTab === "Related Reports" && <RelatedReport />}
        </div>
      </div>
    </NoSSR>
  );
};

export default EditEditorbottom;
