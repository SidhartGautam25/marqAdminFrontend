import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditMOverview: React.FC = () => {
  const { state1, dispatch1 } = useContext(CondContext) as CondContextType;
  const [submit, setSubmit] = useState<boolean>(state1?.two ?? false);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = useState<string>(
    state.moTitle ? state.moTitle : ""
  );
  const editor = useRef(null);
  const [change, setChange] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>(
    state.moDesc ? state.moDesc : ""
  );
  console.log("this is my state market overview ", state);

  const handleEditorChange = (newContent: string) => {
    setChange(true);
    setEditorContent(newContent);
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(true);
    setHeading(e.target.value);
  };
  const handleSubmit = () => {
    if (change) {
      return;
    }
    dispatch({
      type: "SET_EDITRD",
      payload: {
        moHeading: heading,
        moContent: editorContent,
      },
    });
    dispatch1({
      type: "CHANGE_COND",
      payload: {
        two: true,
      },
    });
    setSubmit(true);
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
          onChange={handleHeadingChange}
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
          className={`w-1/6 py-2 my-4 justify-end px-4 ${
            submit ? "bg-green-500" : "bg-blue-500"
          } text-white rounded`}
        >
          {submit ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditMOverview;
