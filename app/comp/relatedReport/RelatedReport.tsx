import React, { useState, useContext } from "react";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";

const RelatedReport: React.FC = () => {
  const { state1, dispatch1 } = useContext(CondContext) as CondContextType;
  const [submit, setSubmit] = useState<boolean>(state1?.eight ?? false);
  const { state, dispatch } = useContext(RDContext) as RDContextType;
  const [relatedReports, setRelatedReports] = useState<string[]>(
    state?.related ?? []
  );
  const [newReport, setNewReport] = useState<string>("");

  const handleAddReport = () => {
    if (newReport.trim()) {
      setRelatedReports([...relatedReports, newReport]);
      setNewReport("");
    }
  };

  const handleDeleteReport = (index: number) => {
    setRelatedReports(relatedReports.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    dispatch({
      type: "SET_RD",
      payload: {
        related: relatedReports,
      },
    });
    dispatch1({
      type: "CHANGE_COND",
      payload: {
        ten: true,
      },
    });
    setSubmit(true);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
            Related Report ID:
          </label>
          <input
            type="text"
            placeholder="Enter related report"
            value={newReport}
            onChange={(e) => setNewReport(e.target.value)}
            className="p-2 border border-gray-300 rounded w-5/6"
          />
        </div>
        <button
          onClick={handleAddReport}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Related Report
        </button>
      </div>
      <div className="mt-6 overflow-x-auto">
        {relatedReports.length > 0 && (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left w-1/3">
                  Related Reports ID
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {relatedReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 w-9/12">
                    {report}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDeleteReport(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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

export default RelatedReport;
