import React, { useEffect, useRef, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { toast } from "react-toastify";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const KeyTrends: React.FC = () => {
  const [submit, setSubmit] = useState<boolean>(false);
  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [heading, setHeading] = React.useState(
    state.ktHeading ? state.ktHeading : ""
  );
  const [subHeading, setSubHeading] = React.useState(
    state.ktSubHeading ? state.ktSubHeading : ""
  );
  const [description, setDescription] = React.useState("");
  const [subHeading2, setSubHeading2] = React.useState(
    state.ktSubHeading2 ? state.ktSubHeading2 : ""
  );
  const [description2, setDescription2] = React.useState("");
  const [image, setImage] = React.useState<File | null>(
    state.ktImage ? state.ktImage : null
  );
  const [image2, setImage2] = React.useState<File | null>(
    state.ktImage2 ? state.ktImage2 : null
  );
  const [imageAlt, setImageAlt] = React.useState("");
  const [imageAlt2, setImageAlt2] = React.useState("");
  const editor1 = useRef(null);
  const [editorContent1, setEditorContent1] = useState<string>(
    state.ktContent1 ? state.ktContent1 : ""
  );
  const editor2 = useRef(null);
  const [editorContent2, setEditorContent2] = useState<string>(
    state.ktContent2 ? state.ktContent2 : ""
  );
  const handleEditorChange1 = (newContent: string) => {
    setEditorContent1(newContent);
  };
  const handleEditorChange2 = (newContent: string) => {
    setEditorContent2(newContent);
  };

  const handleSubmit = () => {
    dispatch({
      type: "SET_RD",
      payload: {
        ktHeading: heading,
        ktSubHeading: subHeading,
        ktContent1: editorContent1,
        ktImage: image,
        ktImageAlt1: imageAlt,
        ktSubHeading2: subHeading2,
        ktTables2: description2,
        ktContent2: editorContent2,
        ktImage2: image2,
        ktImageAlt2: imageAlt2,
      },
    });
    setSubmit(true)
  };

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
  const [loading1, setLoading1] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);

  const handleImageChange1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      console.log("some error occured");
      console.log(files);
      const data = new FormData();
      if (files) {
        data.append("file", files[0]);
        data.append("upload_preset", "ppn3qr4u");
        setLoading1(true);

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        setImage(file.secure_url);
        console.log("we are here now ");
        console.log(file.secure_url);
        setLoading1(false);
      }
      if (e.target.files?.length) {
        toast.success("File selected successfully!");
      }
    }
  };
  const handleImageChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      console.log("some error occured");
      console.log(files);
      const data = new FormData();
      if (files) {
        data.append("file", files[0]);
        data.append("upload_preset", "ppn3qr4u");
        setLoading2(true);

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        setImage2(file.secure_url);
        console.log("we are here now ");
        console.log(file.secure_url);
        setLoading2(false);
      }
      if (e.target.files?.length) {
        toast.success("File selected successfully!");
      }
    }
  };

  // useEffect(() => {
  //   // Cleanup URLs for images to avoid memory leaks
  //   return () => {
  //     if (image) {
  //       URL.revokeObjectURL(URL.createObjectURL(image));
  //     }
  //     if (image2) {
  //       URL.revokeObjectURL(URL.createObjectURL(image2));
  //     }
  //   };
  // }, [image, image2]);

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
        {/* <ReactQuill
          value={description}
          onChange={setDescription}
          className="rounded w-5/6 h-80 mb-10"
          theme="snow"
          modules={modules}
          formats={formats}
        /> */}
        <JoditEditor
          ref={editor1}
          value={editorContent1}
          onChange={(newContent: string) => setEditorContent1(newContent)}
        />
      </div>
      <div className="flex items-center my-12">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange1(e)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      {image && (
        <div className="mb-4">
          {/* <img
            src={URL.createObjectURL(image)}
            alt={imageAlt}
            className="max-w-full h-auto"
          /> */}
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
        {/* <ReactQuill
          value={description2}
          onChange={setDescription2}
          className="rounded w-5/6 h-80 mb-10"
          theme="snow"
          modules={modules}
          formats={formats}
        /> */}
        <JoditEditor
          ref={editor2}
          value={editorContent2}
          onChange={(newContent: string) => setEditorContent2(newContent)}
        />
      </div>
      <div className="flex items-center my-12">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Image 2:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange2(e)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      {image2 && (
        <div className="mb-4">
          {/* <img
            src={URL.createObjectURL(image2)}
            alt={imageAlt2}
            className="max-w-full h-auto"
          /> */}
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
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className={`w-1/6 py-2 my-4 justify-end px-4 ${submit?"bg-green-500":"bg-blue-500"} text-white rounded`}
          >
            {submit?'Submitted':'Submit'}
        </button>
      </div>
    </div>
  );
};

export default KeyTrends;
