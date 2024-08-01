import React, { useRef, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const MSnapshot: React.FC = () => {
  const { state, dispatch } = useContext(RDContext) as RDContextType;

  const [heading, setHeading] = useState<string>(
    state?.msHeading ? state.msHeading : ""
  );
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>(
    state?.msContent ? state.msContent : ""
  );
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >(state?.msTables ? state.msTables : []);
  const [newAttributeKey, setNewAttributeKey] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const handleAddAttribute = () => {
    if (newAttributeKey.trim() && newAttributeValue.trim()) {
      setAttributes([
        ...attributes,
        { key: newAttributeKey, value: newAttributeValue },
      ]);
      setNewAttributeKey("");
      setNewAttributeValue("");
    }
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };
  const handleSubmit = () => {
    dispatch({
      type: "SET_RD",
      payload: {
        msHeading: heading,
        msTables: attributes,
        msContent: editorContent,
      },
    });
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
          onChange={(e) => setHeading(e.target.value)}
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
      <div
        className="mt-6 border border-gray-300 p-4 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: editorContent }}
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

export default MSnapshot;
