"use client";

import { useState } from "react";

interface RadioOption {
  id: string; // Unique identifier for each radio button
  label: string; // Text displayed next to the radio button
}

interface ListItem {
  name: string;
  children: string[]; // Optional children for nested lists
}

const listData: ListItem[] = [
  {
    name: "ev_tech",
    children: [
      "Electric Vehicle",
      "Battery Technology and Manufacturing",
      "Charging Infrastructure",
      "EV Powertrains",
      "EV Components",
      "EV Services",
    ],
  },
  {
    name: "automotive_solutions",
    children: [
      "Passenger Vehicle",
      "Commercial Vehicle",
      "Two-Wheeler",
      "Three-Wheeler",
      "ICE Powertrains",
      "Components",
      "Tire",
      "Services",
    ],
  },
  {
    name: "shared_mobility",
    children: [
      "Car-Based Services",
      "Micro-Mobility Services",
      "Microtransit and Shuttle Services",
      "Autonomous Mobility Services",
      "Subscription and Membership Models",
      "Integrated Mobility Platforms (MaaS)",
    ],
  },
  {
    name: "electrical_electronics",
    children: [
      "ADAS",
      "Sensors",
      "ECU",
      "Electrical and Electronic Components",
    ],
  },
  {
    name: "connectivity_tech",
    children: [
      "In-Vehicle Infotainment",
      "Vehicle-to-Everything (V2X) Communications",
      "Telematics and Remote Services",
      "Connected Safety Features",
      "Vehicle Connectivity Services",
    ],
  },
  {
    name: "industrial_automotive",
    children: [
      "Agricultural Vehicles ",
      "Construction Vehicles",
      "Mining Vehicles ",
      "Warehouse Vehicles ",
      "Forestry Vehicles ",
      "Utility Vehicles ",
      "Cargo Transport Vehicles ",
      "Emergency Service Vehicles ",
      "Railway Service Vehicles ",
      "Port and Terminal Vehicles ",
    ],
  },
  {
    name: "emerging_tech",
    children: [
      "Autonomous Vehicles (AVs)",
      "Alternative Fuels and Powertrains",
      "Automotive Digital Services",
      "Artificial Intelligence (AI) and Machine Learning",
      "Lightweight and Advanced Materials",
      "Smart City Integration",
      "Sustainable Technologies",
    ],
  },
];

const radioOptions: RadioOption[] = [
  { id: "ev_tech", label: "Electric Vehicle Technology" },
  { id: "automotive_solutions", label: "Automotive Solutions" },
  { id: "shared_mobility", label: "Shared Mobility" },
  { id: "electrical_electronics", label: "Electrical and Electronics" },
  { id: "connectivity_tech", label: "Connectivity Technology" },
  { id: "industrial_automotive", label: "Industrial Automotive Application" },
  { id: "emerging_tech", label: "Emerging Technology" },
];

export default function Upins() {
  const [selectedOption, setSelectedOption] = useState<string>("null");
  const [subIndustries, setSubIndustries] = useState<string[]>();
  const [subIndustryOption, setSubIndustryOption] = useState<string>("null");

  const handleChangeSubIndustry = (item: string) => {
    setSubIndustryOption(item);
  };

  const handleChangeIndustry = (option: string) => {
    setSelectedOption(option);
    const selected = listData.find((item) => item.name === option);
    setSubIndustries(selected ? selected.children : []);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upload Your Insight
      </h2>
      <form className="flex flex-col">
        {/* Insight Information */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="insight-title"
          >
            Insight Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="insight-title"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="insight-type"
          >
            Insight Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="insight-type"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="industry"
          >
            Industry
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="industry"
            value={selectedOption}
            onChange={(e) => handleChangeIndustry(e.target.value)}
          >
            <option value="null">Select Industry</option>
            {radioOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="sub-industry"
          >
            Sub-Industry
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="sub-industry"
            value={subIndustryOption}
            onChange={(e) => handleChangeSubIndustry(e.target.value)}
            disabled={!subIndustries || subIndustries.length === 0}
          >
            <option value="null">Select Sub-Industry</option>
            {subIndustries?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* SEO Information */}
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
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="alt-image-pdf"
          >
            Alt Tag for Image within the PDF
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="alt-image-pdf"
            type="text"
          />
        </div>

        {/* Related Insights */}
        {/* <h3 className="text-xl font-semibold mb-4">Related Insights</h3>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-insight-1"
          >
            Related Insight 1 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-insight-1"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-insight-2"
          >
            Related Insight 2 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-insight-2"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-insight-3"
          >
            Related Insight 3 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-insight-3"
            type="text"
          />
        </div> */}

        {/* Related Reports */}
        {/* <h3 className="text-xl font-semibold mb-4">Related Reports</h3>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-report-1"
          >
            Related Report 1 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-report-1"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-report-2"
          >
            Related Report 2 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-report-2"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="related-report-3"
          >
            Related Report 3 URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="related-report-3"
            type="text"
          />
        </div> */}

        {/* Upload Files */}
        <h3 className="text-xl font-semibold mb-4">Upload Files</h3>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="upload-thumbnail"
            >
              Upload Thumbnail Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="upload-thumbnail"
              type="file"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              className="block text-gray-700 text-lg font-medium mb-2"
              htmlFor="upload-pdf"
            >
              Upload PDF Insight
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              id="upload-pdf"
              type="file"
            />
          </div>
        </div>

        <button className="btn-blue mx-2 w-1/2 self-center mt-6 font-semibold flex justify-center border-[1px] rounded border-blue-500 p-3 hover:bg-blue-500 text-blue-500 hover:text-white hover:font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}
