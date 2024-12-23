import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditRDevelopments: React.FC = () => {
  const { state1, dispatch1 } = useContext(CondContext) as CondContextType;
  const [submit, setSubmit] = useState<boolean>(state1?.seven ?? false);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = useState<string>(state?.rDevTitle ?? "");
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>(
    state?.rDevDesc ?? ""
  );

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleSubmit = () => {
    dispatch({
      type: "SET_EDITRD",
      payload: {
        rdHeading: heading,

        rdContent: editorContent,
      },
    });
    dispatch1({
      type: "CHANGE_COND",
      payload: {
        seven: true,
      },
    });
    setSubmit(true);
  };

  useEffect(() => {
    if (editor.current) {
      (editor.current as any).focus();
    }
  }, []);

  return (
    <div className="p-4">
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
      <div className="mb-4 flex items-start">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Description:
        </label>
        <JoditEditor
          ref={editor}
          value={editorContent}
          onChange={(newContent) => setEditorContent(newContent)}
        />
      </div>
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

export default EditRDevelopments;
