import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const MOverview: React.FC = () => {
  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [heading, setHeading] = useState<string>(
    state.moHeading ? state.moHeading : ""
  );
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>(
    state.moContent ? state.moContent : ""
  );
  console.log("this is my state market overview ", state);

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleSubmit = () => {
    dispatch({
      type: "SET_RD",
      payload: {
        moHeading: heading,
        moContent: editorContent,
      },
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Heading:
        </label>
        <input
          type="text"
          name="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>

      <JoditEditor
        ref={editor}
        value={editorContent}
        onChange={handleEditorChange}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-1/6 py-2 my-4 justify-end px-4 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MOverview;
