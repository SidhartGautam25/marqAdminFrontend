import { useContext, useEffect, useState } from "react";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
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

const NoSSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

const EditEditortop = () => {
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submitted, setSubmitted] = useState(editstate?.first);
  console.log("editstate at top of editor is --> ", editstate);
  console.log("submitted is ", submitted);

  const [updated, setUpdated] = useState<Number>(0);

  //  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [form, setForm] = useState({
    title: state?.title,
    slug: state?.slug,
    shortTitle: state?.shortTitle,
    subTitle: state?.subTitle,
    metaTitle: state?.metaTitle,
    metaKeywords: state?.metaKeywords,
    metaDescription: state?.metaDescription,
    category: state?.category,
    subCategory: state?.subCategory,
    geographyTag: state?.geographyTag,
    countryRegion: state?.countryRegion,
    priceSingle: state?.priceSingle,
    priceTeam: state?.priceTeam,
    priceCorporate: state?.priceCorporate,
    publishedDate: state?.publishedDate,
    alti1: state?.alti1,
    alti2: state?.alti2,
    id: state?.id,
  });

  const [subIndustries, setSubIndustries] = useState<string[]>([]);
  const [loading1, setLoading1] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [thumb1, setThumb1] = useState<String>(state?.linki1);
  const [thumb2, setThumb2] = useState<String>(state?.linki2);
  const [imageAlt, setImageAlt] = useState("");
  const [imageAlt2, setImageAlt2] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setUpdated(1);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function checkChanges() {
    console.log("here in check changes top editor edit");
    if (state?.title != form?.title) {
      console.log("1 edit top");
      setSubmitted(false);
    } else if (state?.slug != form?.slug) {
      console.log("2 edit top");
      setSubmitted(false);
    } else if (state?.shortTitle != form?.shortTitle) {
      console.log("3 edit top");
      setSubmitted(false);
    } else if (state?.subTitle != form?.subTitle) {
      console.log("4 edit top");
      setSubmitted(false);
    } else if (state?.metaTitle != form?.metaTitle) {
      console.log("5 edit top");
      setSubmitted(false);
    } else if (state?.metaKeywords != form?.metaKeywords) {
      console.log("6 edit top");
      console.log("so state.metaKeywords is ", state?.metaKeywords);
      console.log("and form metaDescriptions is ", form?.metaKeywords);
      setSubmitted(false);
    } else if (state?.metaDescription != form?.metaDescription) {
      console.log("7 edit top");
      setSubmitted(false);
    } else if (state?.category != form?.category) {
      console.log("8 edit top");
      setSubmitted(false);
    } else if (state?.subCategory != form?.subCategory) {
      console.log("9 edit top");
      setSubmitted(false);
    } else if (state?.geographyTag != form?.geographyTag) {
      console.log("10 edit top");
      setSubmitted(false);
    } else if (state?.countryRegion != form?.countryRegion) {
      console.log("11 edit top");
      setSubmitted(false);
    } else if (state?.priceSingle != form?.priceSingle) {
      console.log("12 edit top");
      setSubmitted(false);
    } else if (state?.priceTeam != form?.priceTeam) {
      console.log("13 edit top");
      setSubmitted(false);
    } else if (state?.priceCorporate != form?.priceCorporate) {
      console.log("14 edit top");
      setSubmitted(false);
    } else if (state?.publishedDate != form?.publishedDate) {
      console.log("15 edit top");
      setSubmitted(false);
    } else if (state?.alti1 != form?.alti1) {
      console.log("16 edit top");
      setSubmitted(false);
    } else if (state?.alti2 != form?.alti2) {
      console.log("17 edit top");
      setSubmitted(false);
    } else if (state?.id != form?.id) {
      console.log("18 edit top");
      setSubmitted(false);
    } else if (state?.linki1 != thumb1) {
      console.log("19 edit top");
      setSubmitted(false);
    } else if (state?.linki2 != thumb2) {
      console.log("20 edit top");
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  }

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
      toast.success("File selected successfully!!");
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
      toast.success("File selected successfully!!");
    }
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("this is the submit function working");
    dispatch({
      type: "SET_EDITRD",
      payload: {
        title: form?.title,
        slug: form?.slug,
        shortTitle: form?.shortTitle,
        subTitle: form?.subTitle,
        metaTitle: form?.metaTitle,
        metaKeywords: form?.metaKeywords,
        metaDescription: form?.metaDescription,
        category: form?.category,
        subCategory: form?.subCategory,
        geographyTag: form?.geographyTag,
        countryRegion: form?.countryRegion,
        priceSingle: form?.priceSingle,
        priceTeam: form?.priceTeam,
        priceCorporate: form?.priceCorporate,
        publishedDate: form?.publishedDate,
        linki1: thumb1,
        alti1: form?.alti1,
        alti2: form?.alti2,
        linki2: thumb2,
        id: form?.id,
      },
    });
    console.log("here", state);
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        first: true,
      },
    });
    setSubmitted(true);
  };

  useEffect(() => {
    checkChanges();
  }, [form, thumb1, thumb2]);

  return (
    <NoSSR>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Report Form</h1>
        <form onSubmit={handleEdit} className="space-y-4">
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
              Id of the Report
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="group flex flex-col  gap-3">
            <div className="flex gap-7">
              <label htmlFor="fileInput1">Image Used In Report Store :</label>
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
          <div className="flex flex-col gap-3">
            <div className="flex gap-7">
              <label htmlFor="fileInput1">
                Image Used In Report Description :
              </label>
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
          <button
            onClick={handleEdit}
            className={`w-1/6 py-2 my-4 justify-end px-4 ${
              submitted ? "bg-green-500" : "bg-blue-500"
            } text-white rounded`}
          >
            {submitted ? "Saved" : "Save this"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </NoSSR>
  );
};

export default EditEditortop;
