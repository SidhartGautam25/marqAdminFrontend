import React, { useState } from "react";

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
// Sample data for the radio buttons
const radioOptions: RadioOption[] = [
  { id: "ev_tech", label: "Electric Vehicle Technology" },
  { id: "automotive_solutions", label: "Automotive Solutions" },
  { id: "shared_mobility", label: "Shared Mobility" },
  { id: "electrical_electronics", label: "Electrical and Electronics" },
  { id: "connectivity_tech", label: "Connectivity Technology" },
  { id: "industrial_automotive", label: "Industrial Automotive Application" },
  { id: "emerging_tech", label: "Emerging Technology" },
];

// Radio button form component
const RadioButtonForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [subIndustries, setSubIndustries] = useState<string[]>();
  const [subIndustryOption, setSubIndustryOption] = useState<string>("");
  // console.log(selectedOption);

  const handleChangeSubIndustry = (item: string) => {
    setSubIndustryOption(item);
  };
  // console.log(" selected Sub Industry name -->" + subIndustryOption);
  // Handle change event for radio buttons
  const handleChangeIndustry = async (id: string) => {
    setSelectedOption(id);
    // const foundItem = listData.find((item) => item.name === selectedOption);
    // console.log(foundItem);
  };
  // console.log(" all Sub Industries array -->" + subIndustries);
  const foundItem = listData.find((item) => item.name === selectedOption);
  console.log("found items"+foundItem);
  
  return (
    <div className="p-4 flex justify-between border-t-2 border-b-2 gap-10">
      <div className=" w-1/2 ">
        <h1 className="text-lg font-medium text-gray-700">Industry</h1>

        {radioOptions.map((option) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
              type="radio"
              id={option.id}
              name="category"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => {
                handleChangeIndustry(option.id);
                setSubIndustries(foundItem?.children);
                console.log(subIndustries);
                
              }}
              className="w-4 h-4 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <label htmlFor={option.id} className="ml-2 ">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div className=" m-2 w-1/2">
        {(foundItem==undefined)?null:<h1 className="text-lg font-medium text-gray-700">Sub-Industry</h1> }
        {subIndustries?.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              id={option}
              name="category"
              value={option}
              checked={selectedOption === option}
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
  );
};

export default RadioButtonForm;
