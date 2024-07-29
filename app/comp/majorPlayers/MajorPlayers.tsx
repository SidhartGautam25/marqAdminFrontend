import React, { useState } from "react";

const MajorPlayers: React.FC = () => {
  const [heading, setHeading] = useState("");
  const [companies, setCompanies] = useState([
    "Continental AG",
    "Delphi Technologies",
    "DENSO Corporation",
    "Robert Bosch GmbH",
    "ZF Friedrichshafen AG",
  ]);

  const addCompany = () => {
    setCompanies([...companies, ""]);
  };

  const removeCompany = (index: number) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const updateCompany = (index: number, value: string) => {
    const updatedCompanies = companies.map((company, i) =>
      i === index ? value : company
    );
    setCompanies(updatedCompanies);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Heading:
        </label>
        <input
          type="text"
          placeholder="Advanced Driver Assistance Systems Market Leaders"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Names:
        </label>
        {companies.map((company, index) => (
          <div key={index} className="flex items-center mb-2 ml-10">
            <input
              type="text"
              placeholder={`Company ${index + 1}`}
              value={company}
              onChange={(e) => updateCompany(index, e.target.value)}
              className="p-2 border border-gray-300 rounded w-5/6 mr-2"
            />
            <button
              onClick={() => removeCompany(index)}
              className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded"
            >
              &ndash;
            </button>
          </div>
        ))}
        <button
          onClick={addCompany}
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mt-4"
        >
          Add Company Name
        </button>
      </div>
    </div>
  );
};

export default MajorPlayers;