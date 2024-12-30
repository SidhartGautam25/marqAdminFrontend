import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditRDevelopments: React.FC = () => {
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.seven ?? true);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = useState<string>(state?.rDevTitle ?? "");
  const editor = useRef(null);

  const normalizeContent = (content: string): string => {
    // Remove whitespace and normalize the HTML
    return content.replace(/\s+/g, " ").trim();
  };
  const [editorContent, setEditorContent] = useState<string>(
    normalizeContent(state?.rDevDesc ?? "")
  );

  const changeHeading = (newContent: string): void => {
    setHeading(newContent);
    let x: string[] = [newContent, editorContent];
    let y: string[] = [state?.rDevTitle, state?.rDevDesc];
    checkChanges(x, y);
  };

  const checkChanges = (x: string[], y: string[]): void => {
    let size = x.length;
    for (let i = 0; i < size; i++) {
      if (x[i] != y[i]) {
        // console.log("diffrences occur at index ", i);
        // console.log("x[i] is ", x[i]);
        // console.log("y[i] is ", y[i]);
        if (submit) {
          setSubmit(false);
          //   editdispatch({
          //     type: "CHANGE_EDIT_COND",
          //     payload: {
          //       seven: false,
          //     },
          //   });
        }

        return;
      }
    }

    if (!submit) {
      setSubmit(true);
      //   editdispatch({
      //     type: "CHANGE_EDIT_COND",
      //     payload: {
      //       seven: true,
      //     },
      //   });
    }
  };

  const handleEditorChange = (newContent: string) => {
    const normalizedNewContent = normalizeContent(newContent);
    if (normalizedNewContent !== editorContent) {
      setEditorContent(newContent);
      let x: string[] = [heading, normalizedNewContent];
      let y: string[] = [state?.rDevTitle, editorContent];
      checkChanges(x, y);
    }
  };

  const handleSubmit = () => {
    if (submit) {
      return;
    }
    dispatch({
      type: "SET_EDITRD",
      payload: {
        rDevTitle: heading,

        rDevDesc: editorContent,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
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
          onChange={(e) => changeHeading(e.target.value)}
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
          onChange={handleEditorChange}
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
