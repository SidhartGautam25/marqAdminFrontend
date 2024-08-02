import { useContext, useEffect, useState } from "react";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { toast } from "react-toastify";
interface RadioOption {
  id: string;
  label: string;
}

interface ListItem {
  name: string;
  children: string[];
}

const listData: ListItem[] = [
  {
    name: "Electric and Hybrid Vehicles",
    children: [
      "Battery Technology",
      "Electric Motors",
      "Charging Infrastructure",
      "Hybrid Systems",
      "Vehicle Design",
    ],
  },
  {
    name: "Vehicles and Components",
    children: [
      "Chassis",
      "Engine Components",
      "Transmission Systems",
      "Braking Systems",
      "Fuel Systems",
    ],
  },
  {
    name: "Shared Mobility",
    children: [
      "Car Sharing",
      "Ride Hailing",
      "Bike Sharing",
      "Scooter Sharing",
      "Fleet Management",
    ],
  },
  {
    name: "Tire",
    children: [
      "Manufacturing",
      "Design",
      "Recycling",
      "Performance Testing",
      "Distribution",
    ],
  },
  {
    name: "Connectivity Technology",
    children: [
      "Telematics",
      "Vehicle-to-Everything (V2X)",
      "Infotainment Systems",
      "Navigation Systems",
      "Remote Diagnostics",
    ],
  },
  {
    name: "Sensors, Electronics, and Electrical Equipment",
    children: [
      "LIDAR",
      "RADAR",
      "Cameras",
      "Control Units",
      "Wiring Harnesses",
    ],
  },
];

const radioOptions: RadioOption[] = listData.map((item) => ({
  id: item.name,
  label: item.name,
}));

const Editortop = () => {
  const { state, dispatch } = useContext(RDContext) as RDContextType;
  //  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [form, setForm] = useState({
    title: state?.title ?? "",
    slug: state?.slug ?? "",
    shortTitle: state?.shortTitle ?? "",
    subTitle: state?.subTitle ?? "",
    metaTitle: state?.metaTitle ?? "",
    metaKeywords: state?.metaKeywords ?? "",
    metaDescription: state?.metaDescription ?? "",
    category: state?.category ?? "",
    subCategory: state?.subCategory ?? "",
    geographyTag: state?.geographyTag ?? "",
    countryRegion: state?.countryRegion ?? "",
    priceSingle: state?.priceSingle ?? "",
    priceTeam: state?.priceTeam ?? "",
    priceCorporate: state?.priceCorporate ?? "",
    publishedDate: state?.publishedDate ?? "",
    relatedReports: state?.relatedReports ?? "",
  });

  const [subIndustries, setSubIndustries] = useState<string[]>([]);
  const [loading1, setLoading1] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [thumb1, setThumb1] = useState<String>("");
  const [thumb2, setThumb2] = useState<String>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeIndustry = (option: string) => {
    setForm({ ...form, category: option, subCategory: "" });
    const selected = listData.find((item) => item.name === option);
    setSubIndustries(selected ? selected.children : []);
  };

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
      setThumb1(file.secure_url);
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
      setThumb2(file.secure_url);
      console.log("we are here now ");
      console.log(file.secure_url);
      setLoading2(false);
    }
    if (e.target.files?.length) {
      toast.success("File selected successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("this is the submit function working");
    dispatch({
      type: "SET_RD",
      payload: {
        title: form.title,
        slug: form.slug,
        shortTitle: form.shortTitle,
        subTitle: form.subTitle,
        metaTitle: form.metaTitle,
        metaKeywords: form.metaKeywords,
        metaDescription: form.metaDescription,
        category: form.category,
        subCategory: form.subCategory,
        geographyTag: form.geographyTag,
        countryRegion: form.countryRegion,
        priceSingle: form.priceSingle,
        priceTeam: form.priceTeam,
        priceCorporate: form.priceCorporate,
        publishedDate: form.publishedDate,
        relatedReports: form.relatedReports,
        linki1: thumb1,
        alti1: "",
        alti2: "",
        linki2: thumb2,
      },
    });
    console.log("here", state);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Report Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Title
          </label>
          <input
            type="text"
            name="shortTitle"
            value={form.shortTitle}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub-Title *
          </label>
          <textarea
            name="subTitle"
            value={form.subTitle}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full h-24"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Information
          </label>
          <input
            type="text"
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="metaKeywords"
            value={form.metaKeywords}
            onChange={handleChange}
            placeholder="Meta Keywords"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            placeholder="Meta Description"
            className="mt-1 p-2 border border-gray-300 rounded w-full h-24"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industry *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={(e) => handleChangeIndustry(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Industry</option>
            {radioOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub-Category *
          </label>
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Sub-Category</option>
            {subIndustries.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Geography Tag *
          </label>
          <select
            name="geographyTag"
            value={form.geographyTag}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="Global">Global</option>
            {/* Add other tags here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country/Region *
          </label>
          <select
            name="countryRegion"
            value={form.countryRegion}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="Global">Global</option>
            {/* Add other countries/regions here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (Single, Team, Corporate) *
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="priceSingle"
              value={form.priceSingle}
              onChange={handleChange}
              placeholder="Single"
              className="mt-1 p-2 border border-gray-300 rounded w-1/3"
              required
            />
            <input
              type="number"
              name="priceTeam"
              value={form.priceTeam}
              onChange={handleChange}
              placeholder="Team"
              className="mt-1 p-2 border border-gray-300 rounded w-1/3"
              required
            />
            <input
              type="number"
              name="priceCorporate"
              value={form.priceCorporate}
              onChange={handleChange}
              placeholder="Corporate"
              className="mt-1 p-2 border border-gray-300 rounded w-1/3"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Published Date *
          </label>
          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Related Reports
          </label>
          <input
            type="text"
            name="relatedReports"
            value={form.relatedReports}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput1">Image Used In Report Store</label>
          <input
            type="file"
            name="file1"
            id="fileInput1"
            required
            // placeholder="upload your profile"
            onChange={uploadImage1}
            placeholder="Title"
            // className="hidden"
          />
        </div>
        <div className="group flex flex-col items-center gap-3 self-center">
          <label htmlFor="fileInput1">Image Used In Report</label>
          <input
            type="file"
            name="file1"
            id="fileInput1"
            required
            // placeholder="upload your profile"
            onChange={uploadImage2}
            placeholder="Title"
            // className="hidden"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Editortop;
