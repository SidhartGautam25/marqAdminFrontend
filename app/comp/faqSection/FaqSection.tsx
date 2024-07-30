import React, { useState } from "react";

const FaqSection: React.FC = () => {
  const [heading, setHeading] = useState("");
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [newFaq, setNewFaq] = useState<{ question: string; answer: string }>({
    question: "",
    answer: "",
  });

  const handleFaqChange = (field: string, value: string) => {
    setNewFaq({ ...newFaq, [field]: value });
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFaqs([...faqs, newFaq]);
      setNewFaq({ question: "", answer: "" });
    }
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
          Heading:
        </label>
        <input
          type="text"
          placeholder="FAQs"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="p-2 border border-gray-300 rounded w-5/6"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add New FAQ:
        </label>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
              Question:
            </label>
            <input
              type="text"
              placeholder="Enter question"
              value={newFaq.question}
              onChange={(e) => handleFaqChange("question", e.target.value)}
              className="p-2 border border-gray-300 rounded w-5/6"
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
              Answer:
            </label>
            <input
              type="text"
              placeholder="Enter answer"
              value={newFaq.answer}
              onChange={(e) => handleFaqChange("answer", e.target.value)}
              className="p-2 border border-gray-300 rounded w-5/6"
            />
          </div>
          <button
            onClick={handleAddFaq}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add FAQ
          </button>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        {faqs.length > 0 && (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left w-1/3">
                  Question
                </th>
                <th className="border border-gray-300 p-2 text-left w-1/3">
                  Answer
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 w-5/12">
                    {faq.question}
                  </td>
                  <td className="border border-gray-300 p-2 w-5/12">
                    {faq.answer}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDeleteFaq(index)}
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
          type="submit"
          className="w-1/6 py-2 my-4 justify-end px-4 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FaqSection;
