"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import add from "@/public/add.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define the type for the radio options
interface RadioOption {
  id: string; // Unique identifier for each radio button
  label: string; // Text displayed next to the radio button
}

// Define the type for the list items
interface ListItem {
  name: string;
  children: string[]; // Optional children for nested lists
}

const listData: ListItem[] = [
  {
    name: "Electric and Hybrid Vehicles",
    children: [
     "Battery Technology",
    "Electric Motors",
    "Charging Infrastructure",
    "Hybrid Systems",
    "Vehicle Design"
    ],
  },
  {
    name: " Vehicles and Components",
    children: [
        "Chassis",
        "Engine Components",
        "Transmission Systems",
        "Braking Systems",
        "Fuel Systems"
    ],
  },
  {
    name: "Shared Mobility",
    children: [
      "Car Sharing",
      "Ride Hailing",
      "Bike Sharing",
      "Scooter Sharing",
      "Fleet Management"
    ],
  },
  {
    name: "Tire",
    children: [
      "Manufacturing",
    "Design",
    "Recycling",
    "Performance Testing",
    "Distribution"
    ],
  },
  {
    name: "Connectivity Technology",
    children: [
      "Telematics",
    "Vehicle-to-Everything (V2X)",
    "Infotainment Systems",
    "Navigation Systems",
    "Remote Diagnostics"
    ],
  },
  {
    name: "Sensors, Electronics, and Electrical Equipment",
    children: [
      "LIDAR",
    "RADAR",
    "Cameras",
    "Control Units",
    "Wiring Harnesses"
    ],
  },
];
// Sample data for the radio buttons
const radioOptions: RadioOption[] = [
  { id: "Electric and Hybrid Vehicles", label: "Electric and Hybrid Vehicles" },
  { id: "Vehicles and Components", label: "Vehicles and Components" },
  { id: "Shared Mobility", label: "Shared Mobility" },
  { id: "Tire", label: "Tire" },
  { id: "Connectivity Technology", label: "Connectivity Technology" },
  { id: "Sensors, Electronics, and Electrical Equipment", label: "Sensors, Electronics, and Electrical Equipment" },
];

export default function Upsec() {
  const [selectedOption, setSelectedOption] = useState<string>("null");
  const [subIndustries, setSubIndustries] = useState<string[]>();
  const [subIndustryOption, setSubIndustryOption] = useState<string>("null");
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);
  const [loading4, setLoading4] = useState<boolean>(false);
  const [imagep, setImagep] = useState<string>("");
  const [imagei, setImagei] = useState<string>("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pricingSin, setPricingSin] = useState("");
  const [pricingTeam, setPricingTeam] = useState("");
  const [pricingCor, setPricingCor] = useState("");
  const [faq, setFaq] = useState("");
  const [toc, setToc] = useState("");
  const [imagef, setImagef] = useState<string>("");
  const [imaget, setImaget] = useState<string>("");

  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDesc, setMetaDesc] = useState<string>("");
  const [metaKey, setMetaKey] = useState<string>("");
  const [tumb, settumb] = useState<string>("");
  const [altimg1, setaltimg1] = useState<string>("");
  const [altimg2, setaltimg2] = useState<string>("");
  const [study, setstudy] = useState<string>("");
  const [base, setbase] = useState<string>("");
  const [forcast, setforcast] = useState<string>("");

  const url = "https://marq-admin-backend.onrender.com/api/upload/uploadreport";
  const local = "http://localhost:8800/api/upload/uploadreport";

  // const [date, dateChange] = useState<Date>(new Date());
  const router = useRouter();
  // console.log(selectedOption);

  const handleChangeSubIndustry = (item: string) => {
    setSubIndustryOption(item);
  };
  // console.log(" selected Sub Industry name -->" + subIndustryOption);
  // Handle change event for radio buttons
  const handleChangeIndustry = async (option: RadioOption, i: number) => {
    setSelectedOption(option.id);
    setSubIndustries(listData[i].children);

    // const foundItem = listData.find((item) => item.name === selectedOption);
    // console.log(foundItem);
  };
  // console.log(" all Sub Industries array -->" + subIndustries);

  // const [data,setData]=useState({})
  const uploadImage1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setImagep(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading1(false);
    }
    if (e.target.files?.length) {
      toast.success("File selected successfully!");
    }
  };

  const uploadImage2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setImagei(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading2(false);
    }
    if (e.target.files?.length) {
      toast.success("File selected successfully!");
    }
  };

  const uploadImage3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("some error occured");
    console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "ppn3qr4u");
      setLoading3(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();
      setImagef(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading3(false);
    }

    if (e.target.files?.length) {
      toast.success("File selected successfully!");
    }
  };

  const uploadImage4 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("some error occured");
    console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "ppn3qr4u");
      setLoading4(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzpbucfz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();
      setImaget(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading4(false);
    }

    if (e.target.files?.length) {
      toast.success("File selected successfully!");
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit button clicked");
    console.log("image 1 is ", imagep);
    console.log("image 2 is ", imagei);
    const daata = {
      title: title,
      linkp: imagep,
      linki: imagei,
      linkf: imagef,
      linkt: imaget,
      desc: desc,
      industry: selectedOption,
      subind: subIndustryOption,
      dataSuite: pricingSin,
      insightReport: pricingTeam,
      metaTitle: metaTitle,
      metaDesc: metaDesc,
      metaKey: metaKey,
    };
    const res = await axios.post(local, daata);
    toast.success("Report submitted sucessfully!");
  };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.length) {
  //     toast.success("File selected successfully!");
  //   }
  // };
  return (
    <div className="flex flex-col px-12 py-4">
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

      <div className="p-4 flex justify-between border-t-2 border-b-2 gap-10">
        {/* main industry section */}
        <div className=" w-1/2 ">
          <h1 className="text-lg font-medium text-gray-700">Industry</h1>

          {radioOptions.map((option, i) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                type="radio"
                id={option.id}
                name="industry"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => {
                  handleChangeIndustry(option, i);
                }}
                className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label htmlFor={option.id} className="ml-2 ">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {/* sub industry division */}
        <div className=" m-2 w-1/2">
          {selectedOption == "null" ? null : (
            <h1 className="text-lg font-medium text-gray-700">Sub-Industry</h1>
          )}
          {subIndustries?.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="radio"
                id={option}
                name="subindustry"
                value={option}
                checked={option === subIndustryOption}
                onChange={() => handleChangeSubIndustry(option)}
                className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
              <label htmlFor={option} className="ml-2 ">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* seo info */}
      <div className="p-4 flex flex-col justify-between border-t-2 border-b-2">
        <h3 className="text-xl font-semibold my-4">SEO Information</h3>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="meta-title"
          >
            Meta Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="meta-title"
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="meta-description"
          >
            Meta Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="meta-description"
            rows={4}
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="meta-keywords"
          >
            Meta Keywords
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="meta-keywords"
            type="text"
            value={metaKey}
            onChange={(e) => setMetaKey(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-thumbnail"
          >
            Alt Tag for Thumbnail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-thumbnail"
            type="text"
            value={tumb}
            onChange={(e)=>settumb(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Alt Tag for Image 1 within the PDF
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
            value={altimg1}
            onChange={(e)=>setaltimg1(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Alt Tag for Image 2 within the PDF
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
            value={altimg2}
            onChange={(e)=>setaltimg2(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Study Period
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
            value={study}
            onChange={(e)=>setstudy(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Base Year
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
            value={base}
            onChange={(e)=>setbase(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Forecast Period
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
            value={forcast}
            onChange={(e)=>setforcast(e.target.value)}
            required
          />
        </div>
      </div>
      {/* related Report sction */}
      {/* <div className="flex flex-col gap-3">
        <div className="flex gap-20">
          <div className="">
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
              Study Period
            </label>
            <input
              type="title"
              id="title"
              required
              className="mt-1 block  px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="">
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700"
            >
              Forecast Period
            </label>
            <input
              type="title"
              id="title"
              required
              className="mt-1 block px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Related Report 1
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
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Related Report 2
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
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Related Report 3
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
      </div> */}
      {/* upload Pdf and image for the thumbnail */}
      <div className="flex self-center gap-24 my-4">
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput1">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file1"
            id="fileInput1"
            required
            // placeholder="upload your profile"
            onChange={uploadImage1}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload PDF
          </span>
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput2">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file2"
            id="fileInput2"
            required
            // placeholder="upload your profile"
            onChange={uploadImage2}
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload Thumbnail
          </span>
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput3">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file3"
            id="fileInput3"
            required
            // placeholder="upload your profile"
            onChange={uploadImage3} //change onchange function accordingly
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload FAQ
          </span>
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput4">
            <Image
              src={add}
              alt="img"
              className=" hover:cursor-pointer h-[30px] w-[30px]"
            />
          </label>
          <input
            type="file"
            name="file4"
            id="fileInput4"
            required
            // placeholder="upload your profile"
            onChange={uploadImage4} //change onchange function accordingly
            placeholder="Title"
            className="hidden"
          />
          <span className=" group-hover:font-bold group-hover:text-green-600 ">
            Upload Table of Content
          </span>
        </div>
      </div>

      {/* set pricing */}
      <div className="flex border-b-2 pb-4 justify-between">
        <div className="w-1/3 mx-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Pricing for Data Suite
          </label>
          <input
            type="title"
            id="title"
            placeholder="in dollars"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
            value={pricingSin}
            onChange={(e) => setPricingSin(e.target.value)}
          />
        </div>
        <div className="w-1/3 mx-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">
            Pricing for Insight Report
          </label>
          <input
            type="title"
            id="title"
            placeholder="in dollars"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none"
            value={pricingTeam}
            onChange={(e) => setPricingTeam(e.target.value)}
          />
        </div>
      </div>
      {/* <div>
        <Calendar onChange={dateChange} value={date}/>
      </div> */}

      <div>{loading1 ? <h3>loading</h3> : <img src={imagep} alt="" />}</div>
      <div>{loading2 ? <h3>loading</h3> : <img src={imagei} alt=""></img>}</div>
      <button
        onClick={handleClick}
        className="btn-blue mx-2 w-1/2 self-center mt-6 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-bold"
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
}
