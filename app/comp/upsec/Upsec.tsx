import { useState } from "react";
import axios from "axios";

export default function Upsec() {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [data,setData]=useState({})
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("some error occured");
    console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "ppn3qr4u");
      setLoading(true);

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
      setLoading(false);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const daata = {
      title: "this is the title",
      link: "this is the link",
      desc: "this is the description",
    };
    const res = await axios.post(
      "http://localhost:8800/api/upload/uploadreport",
      daata
    );
  };

  return (
    <div>
      <div className="border-2 border-black flex">
        <div className="m-1 p-2 rounded-lg flex flex-col items-center gap-5 ">
          <div>
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="title"
              id="title"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="pageNo"
              className="text-lg font-medium text-gray-700"
            >
              Desc
            </label>
            <textarea
              id="pageNo"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="text-[20px] mt-11 m-2 border-2 text-center border-black bg-red-400 rounded-lg h-9 w-9">
        +
      </div> */}
      </div>
      <input
        type="file"
        name="file"
        // placeholder="upload your profile"
        onChange={uploadImage}
        className="border-2  border-black"
      />

      <div>{loading ? <h3>loading</h3> : <img src={image} alt="" />}</div>
      <button
        onClick={handleClick}
        className="bg-gray-700 text-white rounded-lg m-2 p-2 font-bold w-80"
      >
        submit
      </button>
    </div>
  );
}
