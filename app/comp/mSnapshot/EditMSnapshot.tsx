import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
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

const EditMSnapshot: React.FC = () => {
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  console.log("state which need to be edited is ", state);

  const [heading, setHeading] = useState<string>(
    state?.msHeading ? state.msHeading : ""
  );
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>(
    state?.msDesc ? state.msDesc : ""
  );
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >(state?.msTable ? state.msTable : []);
  const [newAttributeKey, setNewAttributeKey] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.one ?? true);

  const checkChanges = (
    x: string[],
    y: string[],
    obj: { t: boolean }
  ): void => {
    let size = x.length;
    for (let i = 0; i < size; i++) {
      if (x[i] != y[i]) {
        // console.log("diffrences occur at index ", i);
        // console.log("x[i] is ", x[i]);
        // console.log("y[i] is ", y[i]);
        if (submit) {
          obj.t = false;
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
      obj.t = true;
      setSubmit(true);
      //   editdispatch({
      //     type: "CHANGE_EDIT_COND",
      //     payload: {
      //       two: true,
      //     },
      //   });
    }
  };
  const checkChanges2 = (x: {}[], y: {}[]): void => {
    if (x.length !== y.length) {
      setSubmit(false);
      return;
    }

    const areObjectsEqual = (
      obj1: { [key: string]: string },
      obj2: { [key: string]: string }
    ): boolean => {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      return keys1.every((key) => obj1[key] === obj2[key]); // Check key-value pairs
    };

    // Sort both arrays by a consistent key, like 'question'
    //   const sortedX = [...x].sort((a, b) =>
    //     a.question.localeCompare(b.question)
    //   );
    //   const sortedY = [...y].sort((a, b) =>
    //     a.question.localeCompare(b.question)
    //   );

    const isEqual = x.every((item, index) => areObjectsEqual(item, y[index]));

    setSubmit(isEqual);
  };

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
    let x: string[] = [heading, newContent];
    let y: string[] = [state?.msHeading, state?.msContent];
    let obj = { t: true };
    checkChanges(x, y, obj);
    if (obj.t) {
      checkChanges2(attributes, state?.msTable);
    }
  };

  const handleAddAttribute = () => {
    if (newAttributeKey.trim() && newAttributeValue.trim()) {
      setAttributes([
        ...attributes,
        { key: newAttributeKey, value: newAttributeValue },
      ]);
      setNewAttributeKey("");
      setNewAttributeValue("");
      let x: string[] = [heading, editorContent];
      let y: string[] = [state?.msHeading, state?.msContent];
      let obj = { t: true };
      checkChanges(x, y, obj);
      let temp = [
        ...attributes,
        { key: newAttributeKey, value: newAttributeValue },
      ];
      if (obj.t) {
        checkChanges2(temp, state?.msTable);
      }
    }
  };

  const handleRemoveAttribute = (index: number) => {
    let temp = attributes.filter((_, i) => i !== index);
    setAttributes(temp);
    let x: string[] = [heading, editorContent];
    let y: string[] = [state?.msHeading, state?.msContent];
    let obj = { t: true };
    checkChanges(x, y, obj);
    if (obj.t) {
      checkChanges2(temp, state?.msTable);
    }
  };
  const handleHeadingChange = (newHeading: string) => {
    setHeading(newHeading);
    let x: string[] = [newHeading, editorContent];
    let y: string[] = [state?.msHeading, state?.msContent];
    let obj = { t: true };
    checkChanges(x, y, obj);
    if (obj.t) {
      checkChanges2(attributes, state?.msTable);
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: "SET_EDITRD",
      payload: {
        msHeading: heading,
        msTables: attributes,
        msContent: editorContent,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        one: true,
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
    <div className="p-6">
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Heading:
        </label>
        <input
          type="text"
          name="heading"
          value={heading}
          onChange={(e) => handleHeadingChange(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      <div className="mb-8 flex flex-wrap">
        <input
          type="text"
          placeholder="Report Attribute"
          value={newAttributeKey}
          onChange={(e) => setNewAttributeKey(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4 w-4/12"
        />
        <input
          type="text"
          placeholder="Details"
          value={newAttributeValue}
          onChange={(e) => setNewAttributeValue(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-4 w-7/12"
        />
        <button
          onClick={handleAddAttribute}
          className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left w-4/12">
                Report Attributes
              </th>
              <th className="border border-gray-300 p-2 text-left w-6/12">
                Details
              </th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 w-4/12">
                  {attr.key}
                </td>
                <td className="border border-gray-300 p-2 w-6/12">
                  {attr.value}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleRemoveAttribute(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <JoditEditor
        ref={editor}
        value={editorContent}
        onChange={handleEditorChange}
      />
      {/* <div
        className="mt-6 border border-gray-300 p-4 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      /> */}
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

export default EditMSnapshot;
