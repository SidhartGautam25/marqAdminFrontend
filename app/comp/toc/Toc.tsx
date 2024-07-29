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

import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const MyComponent: React.FC = () => {
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>("");

  const handleEditorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  return (
    <div className="p-6">
      <JoditEditor
        ref={editor}
        value={editorContent}
        config={{
          readonly: false,
          buttons: [
            "bold",
            "italic",
            "underline",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "fullsize",
          ],
        }}
        onChange={handleEditorChange}
      />
      <div
        className="mt-6 border border-gray-300 p-4 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      />
    </div>
  );
};

export default MyComponent;
