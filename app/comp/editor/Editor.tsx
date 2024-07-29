// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   DraftInlineStyleType,
//   convertToRaw,
// } from "draft-js";
// import "draft-js/dist/Draft.css";
// import axios from "axios";

// // Define font sizes from 12 to 30
// const fontSizes: number[] = Array.from({ length: 19 }, (_, i) => i + 12);

// // Create a style map for the font sizes
// const styleMap: Record<string, React.CSSProperties> = {};
// fontSizes.forEach((size) => {
//   styleMap[`FONT_SIZE_${size}`] = {
//     fontSize: `${size}px`,
//   };
// });

// const EditorComponent: React.FC = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [currentFontSize, setCurrentFontSize] = useState<number>(16);

//   const handleEditorChange = (state: EditorState) => {
//     setEditorState(state);
//   };

//   const saveContent = () => {
//     const content = editorState.getCurrentContent();
//     const rawContent = JSON.stringify(convertToRaw(content));

//     // Assuming you have a backend endpoint to send the data to
//     axios
//       .post("http://localhost:5000/saveContent", { content: rawContent })
//       .then((response) => {
//         console.log("Content saved successfully:", response);
//       })
//       .catch((error) => {
//         console.error("There was an error saving the content:", error);
//       });
//   };

//   const toggleFontSize = (size: number) => {
//     const newEditorState = RichUtils.toggleInlineStyle(
//       editorState,
//       `FONT_SIZE_${size}` as DraftInlineStyleType
//     );
//     setEditorState(newEditorState);
//     setCurrentFontSize(size);
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>Draft.js Editor</h2>
//       <div>
//         <label htmlFor="fontSize">Font Size: </label>
//         <select
//           id="fontSize"
//           value={currentFontSize}
//           onChange={(e) => toggleFontSize(Number(e.target.value))}
//         >
//           {fontSizes.map((size) => (
//             <option key={size} value={size}>
//               {size}px
//             </option>
//           ))}
//         </select>
//       </div>
//       <div
//         style={{
//           border: "1px solid #ddd",
//           padding: "10px",
//           minHeight: "200px",
//           marginTop: "10px",
//         }}
//       >
//         <Editor
//           editorState={editorState}
//           onChange={handleEditorChange}
//           customStyleMap={styleMap}
//         />
//       </div>
//       <button onClick={saveContent} style={{ marginTop: "10px" }}>
//         Save Content
//       </button>
//     </div>
//   );
// };

// export default EditorComponent;

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

// const MyComponent = () => {
//   const [editorContent, setEditorContent] = useState<string>("");

//   const handleEditorChange = (content: string) => {
//     setEditorContent(content);
//   };

//   return (
//     <div>
//       <div>
//         <p> My Other Contents </p>
//         <SunEditor onChange={handleEditorChange} />
//       </div>
//       <div
//         style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px" }}
//         dangerouslySetInnerHTML={{ __html: editorContent }}
//       />
//     </div>
//   );
// };
// export default MyComponent;

// import React, { useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
// import QuillPasteSmart from "quill-paste-smart"; // Import the quill-paste-smart module

// // Register the quill-paste-smart module
// Quill.register("modules/pasteSmart", QuillPasteSmart);

// const MyComponent: React.FC = () => {
//   const [editorContent, setEditorContent] = useState<string>("");

//   const handleEditorChange = (content: string) => {
//     setEditorContent(content);
//   };

//   return (
//     <div>
//       <p>My Other Contents</p>
//       <ReactQuill
//         value={editorContent}
//         onChange={handleEditorChange}
//         modules={{
//           toolbar: [
//             [{ header: "1" }, { header: "2" }, { font: [] }],
//             [{ size: [] }],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [
//               { list: "ordered" },
//               { list: "bullet" },
//               { indent: "-1" },
//               { indent: "+1" },
//             ],
//             ["link", "image", "video"],
//             ["clean"],
//           ],
//           pasteSmart: {
//             // You can add specific configurations here if needed
//             keepSelection: true,
//             image: true,
//             plainText: true,
//           },
//         }}
//       />
//       <div
//         style={{
//           marginTop: "20px",
//           border: "1px solid #ddd",
//           padding: "10px",
//           minHeight: "200px",
//         }}
//         className="editor-content"
//         dangerouslySetInnerHTML={{ __html: editorContent }}
//       />
//     </div>
//   );
// };

// export default MyComponent;

// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const MyComponent: React.FC = () => {
//   const [editorContent, setEditorContent] = useState<string>("");

//   const handleEditorChange = (content: string) => {
//     setEditorContent(content);
//   };

//   return (
//     <div>
//       <p>My Other Contents</p>
//       <Editor
//         apiKey="YOUR_TINY_MCE_API_KEY" // Get a free API key from TinyMCE
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             "advlist autolink lists link image charmap print preview anchor",
//             "searchreplace visualblocks code fullscreen",
//             "insertdatetime media table paste code help wordcount",
//           ],
//           toolbar:
//             "undo redo | formatselect | bold italic backcolor | \
//             alignleft aligncenter alignright alignjustify | \
//             bullist numlist outdent indent | removeformat | help",
//           paste_data_images: true,
//           paste_as_text: true,
//           automatic_uploads: true,
//         }}
//         value={editorContent}
//         onEditorChange={handleEditorChange}
//       />
//       <div
//         style={{
//           marginTop: "20px",
//           border: "1px solid #ddd",
//           padding: "10px",
//           minHeight: "200px",
//         }}
//         className="editor-content"
//         dangerouslySetInnerHTML={{ __html: editorContent }}
//       />
//     </div>
//   );
// };

// export default MyComponent;

import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const MyComponent: React.FC = () => {
  const [heading, setHeading] = useState<string>("");
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [attributes, setAttributes] = useState<
    { key: string; value: string }[]
  >([]);
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
