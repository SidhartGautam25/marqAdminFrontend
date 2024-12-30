import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
import { checkIsOnDemandRevalidate } from "next/dist/server/api-utils";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditMOverview: React.FC = () => {
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  //   console.log("state at market overview is ", state);
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.two ?? true);
  const [heading, setHeading] = useState<string>(
    state.moTitle ? state.moTitle : ""
  );
  const editor = useRef(null);
  const [change, setChange] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>(
    state.moDesc ? state.moDesc : ""
  );
  //   console.log("this is my state market overview ", state);

  // x:= array which stores the current values of diffrent variables
  // y:= array which stores the  saved values of diffrent variables
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
          //       two: false,
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
      //       two: true,
      //     },
      //   });
    }
  };

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
    let x: string[] = [newContent, heading];
    let y: string[] = [state?.moDesc, state?.moTitle];
    checkChanges(x, y);
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(e.target.value);
    let x: string[] = [editorContent, e.target.value];
    let y: string[] = [state?.moDesc, state?.moTitle];
    checkChanges(x, y);
  };
  const handleSubmit = () => {
    dispatch({
      type: "SET_EDITRD",
      payload: {
        moTitle: heading,
        moDesc: editorContent,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
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
            submit && !change ? "bg-green-500" : "bg-blue-500"
          } text-white rounded`}
        >
          {submit && !change ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditMOverview;
