// import React, { useState } from "react";

// const MyComponent: React.FC = () => {
//   const [attributes, setAttributes] = useState<
//     { key: string; value: string }[]
//   >([]);
//   const [newAttributeKey, setNewAttributeKey] = useState<string>("");
//   const [newAttributeValue, setNewAttributeValue] = useState<string>("");

//   const handleAddAttribute = () => {
//     if (newAttributeKey.trim() && newAttributeValue.trim()) {
//       setAttributes([
//         ...attributes,
//         { key: newAttributeKey, value: newAttributeValue },
//       ]);
//       setNewAttributeKey("");
//       setNewAttributeValue("");
//     }
//   };

//   const handleRemoveAttribute = (index: number) => {
//     setAttributes(attributes.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-8 flex flex-wrap">
//         <input
//           type="text"
//           placeholder="TOC Title"
//           value={newAttributeKey}
//           onChange={(e) => setNewAttributeKey(e.target.value)}
//           className="p-2 border border-gray-300 rounded mr-4 w-4/12"
//         />
//         <input
//           type="text"
//           placeholder="Details"
//           value={newAttributeValue}
//           onChange={(e) => setNewAttributeValue(e.target.value)}
//           className="p-2 border border-gray-300 rounded mr-4 w-7/12"
//         />
//         <button
//           onClick={handleAddAttribute}
//           className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           Add
//         </button>
//       </div>
//       <div className="my-6 overflow-x-auto">
//         <table className="min-w-full border border-collapse border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left w-4/12">
//                 TOC Titles
//               </th>
//               <th className="border border-gray-300 p-2 text-left w-6/12">
//                 Details
//               </th>
//               <th className="border border-gray-300 p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attributes.map((attr, index) => (
//               <tr key={index} className="border-b border-gray-300">
//                 <td className="border border-gray-300 p-2 w-4/12">
//                   {attr.key}
//                 </td>
//                 <td className="border border-gray-300 p-2 w-6/12">
//                   {attr.value}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   <button
//                     onClick={() => handleRemoveAttribute(index)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;

import React, { useRef, useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditToc: React.FC = () => {
  const normalizeContent = (content: string): string => {
    // Remove whitespace and normalize the HTML
    return content.replace(/\s+/g, " ").trim();
  };
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.nine ?? true);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>(
    normalizeContent(state?.toc ? state.toc : "")
  );

  const checkChanges = (x: string[], y: string[]): void => {
    let size = x.length;
    for (let i = 0; i < size; i++) {
      if (x[i] != y[i]) {
        // console.log("diffrences occur at index in toc ", i);
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
      let x: string[] = [normalizedNewContent];
      let y: string[] = [state?.toc];
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
        toc: editorContent,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        nine: true,
      },
    });
    setSubmit(true);
  };
  useEffect(() => {}, []);

  return (
    <div className="p-6">
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

export default EditToc;
