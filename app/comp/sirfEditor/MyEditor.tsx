import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const OnlyEditor: React.FC = () => {
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

  useEffect(() => {
    if (editor.current) {
      (editor.current as any).focus();
    }
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-start">
        <JoditEditor
          ref={editor}
          value={editorContent}
          onChange={(newContent) => setEditorContent(newContent)}
        />
      </div>
    </div>
  );
};

export default OnlyEditor;
