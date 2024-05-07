import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import add from "@/public/add.png";
import RadioButtonForm from "./nestedlist";
import Calendar from "react-calendar";

export default function Upsec() {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [date, dateChange] = useState<Date>(new Date());
  const router = useRouter();

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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const daata = {
      title: title,
      link: image,
      desc: desc,
    };
    const res = await axios.post(
      "http://localhost:8800/api/upload/uploadreport",
      daata
    );
    router.push("/");
  };

  return (
    <div className="flex flex-col px-12">
      <div className=" flex">
        <div className="m-1 p-5 rounded-lg flex flex-col w-full gap-5">
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="pageNo"
              className="text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="pageNo"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none h-24"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="text-[20px] mt-11 m-2 border-2 text-center border-black bg-red-400 rounded-lg h-9 w-9">
        +
      </div> */}
      </div>

      <div>
        <RadioButtonForm />
      </div>

      {/* upload Pdf and image for the thumbnail */}
      <div className="flex self-center gap-24 my-4">
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file"
            id="fileInput"
            // placeholder="upload your profile"
            onChange={uploadImage}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload PDF
          </span>
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file"
            id="fileInput"
            // placeholder="upload your profile"
            onChange={uploadImage}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload Thumbnail
          </span>
        </div>
      </div>

      {/* <div>
        <Calendar onChange={dateChange} value={date}/>
      </div> */}

        <div>{loading ? <h3>loading</h3> : <img src={image} alt="" />}</div>
      </div>
      <button
        onClick={handleClick}
        className="btn-blue mx-2 w-1/2 self-center mt-6 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
      >
        Submit
      </button>
    </div>
  );
}
