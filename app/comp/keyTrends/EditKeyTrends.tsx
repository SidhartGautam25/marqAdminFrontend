import React, { useEffect, useRef, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { toast } from "react-toastify";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
// import "jodit/build/jodit.min.css";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditKeyTrends: React.FC = () => {
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.four ?? true);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = React.useState(
    state.kmtTitle ? state.kmtTitle : ""
  );
  const [subHeading, setSubHeading] = React.useState(
    state.kmtsh1 ? state.kmtsh1 : ""
  );
  const [description, setDescription] = React.useState("");
  const [subHeading2, setSubHeading2] = React.useState(
    state.kmtsh2 ? state.kmtsh2 : ""
  );
  const [description2, setDescription2] = React.useState("");
  const [image, setImage] = React.useState<File | null>(
    state.kmti1 ? state.kmti1 : null
  );
  const [image2, setImage2] = React.useState<File | null>(
    state.kmti2 ? state.kmti2 : null
  );
  const [imageAlt, setImageAlt] = React.useState("");
  const [imageAlt2, setImageAlt2] = React.useState("");
  const editor1 = useRef(null);
  const [editorContent1, setEditorContent1] = useState<string>(
    state.kmtdesc1 ? state.kmtdesc1 : ""
  );
  const editor2 = useRef(null);
  const [editorContent2, setEditorContent2] = useState<string>(
    state.kmtdesc2 ? state.kmtdesc2 : ""
  );

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

  const handleSubmit = () => {
    dispatch({
      type: "SET_EDITRD",
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
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        four: true,
      },
    });
    setSubmit(true);
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
        let x: string[] = [heading, subHeading, subHeading2, file.secure_url];
        let y: string[] = [
          state?.kmtTitle,
          state?.kmtsh1,
          state?.kmtsh2,
          state?.kmti1,
        ];
        checkChanges(x, y);
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
        let x: string[] = [
          heading,
          subHeading,
          subHeading2,
          image,
          file.secure_url,
        ];
        let y: string[] = [
          state?.kmtTitle,
          state?.kmtsh1,
          state?.kmtsh2,
          state?.kmti1,
          state?.kmti2,
        ];
        checkChanges(x, y);
      }
      if (e.target.files?.length) {
        toast.success("File selected successfully!");
      }
    }
  };

  const handleHeadingChange = (newHeading: string) => {
    setHeading(newHeading);
    let x: string[] = [newHeading];
    let y: string[] = [state?.kmtTitle];
    checkChanges(x, y);
  };

  const handleSubHeadingChange = (newHeading: string) => {
    setSubHeading(newHeading);
    let x: string[] = [heading, subHeading];
    let y: string[] = [state?.kmtTitle, state?.kmtsh1];
    checkChanges(x, y);
  };

  const handleSubHeadingChange2 = (newHeading: string) => {
    setSubHeading2(newHeading);
    let x: string[] = [heading, subHeading, newHeading];
    let y: string[] = [state?.kmtTitle, state?.kmtsh1, state?.kmtsh2];
    checkChanges(x, y);
  };

  const handleImageAlt2Change = (newContent: string) => {
    setImageAlt2(newContent);
    let x: string[] = [
      heading,
      subHeading,
      subHeading2,
      image,
      image2,
      imageAlt,
      newContent,
    ];
    let y: string[] = [
      state?.kmtTitle,
      state?.kmtsh1,
      state?.kmtsh2,
      state?.kmti1,
      state?.kmti2,
      state?.kmti1alt,
      state?.kmti2alt,
    ];
    checkChanges(x, y);
  };
  const handleImageAltChange = (newContent: string) => {
    setImageAlt(newContent);
    let x: string[] = [
      heading,
      subHeading,
      subHeading2,
      image,
      image2,
      newContent,
    ];
    let y: string[] = [
      state?.kmtTitle,
      state?.kmtsh1,
      state?.kmtsh2,
      state?.kmti1,
      state?.kmti2,
      state?.kmti1alt,
    ];
    checkChanges(x, y);
  };

  const handleEditorChange = (newContent: string) => {};
  const handleEditorChange2 = (newContent: string) => {};

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
          onChange={(e) => handleHeadingChange(e.target.value)}
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
          onChange={(e) => handleSubHeadingChange(e.target.value)}
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
              onChange={(e) => handleImageAltChange(e.target.value)}
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
          onChange={(e) => handleSubHeadingChange2(e.target.value)}
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
              onChange={(e) => handleImageAlt2Change(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter alt text for the image"
            />
          </div>
        </div>
      )}
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

export default EditKeyTrends;
