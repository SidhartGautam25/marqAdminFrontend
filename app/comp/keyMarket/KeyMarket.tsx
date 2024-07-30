import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to handle SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const KeyMarket: React.FC = () => {
  const [heading, setHeading] = React.useState("");
  const [subHeading, setSubHeading] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subHeading2, setSubHeading2] = React.useState("");
  const [description2, setDescription2] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [image2, setImage2] = React.useState<File | null>(null);
  const [imageAlt, setImageAlt] = React.useState("");
  const [imageAlt2, setImageAlt2] = React.useState("");

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [
        { header: "1" },
        { header: "2" },
        "bold",
        "italic",
        "underline",
        "strike",
      ],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
  ];

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    // Cleanup URLs for images to avoid memory leaks
    return () => {
      if (image) {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
      if (image2) {
        URL.revokeObjectURL(URL.createObjectURL(image2));
      }
    };
  }, [image, image2]);

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
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Sub-Heading:
        </label>
        <input
          type="text"
          name="subHeading"
          value={subHeading}
          onChange={(e) => setSubHeading(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      <div className="mb-4 flex items-start">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Description:
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="rounded w-5/6 h-80 mb-10"
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="flex items-center my-12">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setImage)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt={imageAlt}
            className="max-w-full h-auto"
          />
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Image Alt Text:
            </label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter alt text for the image"
            />
          </div>
        </div>
      )}
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Sub-Heading 2:
        </label>
        <input
          type="text"
          name="subHeading2"
          value={subHeading2}
          onChange={(e) => setSubHeading2(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      <div className="mb-4 flex items-start">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Description 2:
        </label>
        <ReactQuill
          value={description2}
          onChange={setDescription2}
          className="rounded w-5/6 h-80 mb-10"
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="flex items-center my-12">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Image 2:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setImage2)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      {image2 && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image2)}
            alt={imageAlt2}
            className="max-w-full h-auto"
          />
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Image Alt Text:
            </label>
            <input
              type="text"
              value={imageAlt2}
              onChange={(e) => setImageAlt2(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter alt text for the image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyMarket;
