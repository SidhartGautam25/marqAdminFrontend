import React, { useState } from "react";

const FaqSection: React.FC = () => {
  const [heading, setHeading] = useState("");
  const [faqs, setFaqs] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const handleFaqChange = (index: number, field: string, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFaqs(updatedFaqs);
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
          FAQs:
        </label>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
                Question:
              </label>
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={faq.question}
                onChange={(e) =>
                  handleFaqChange(index, "question", e.target.value)
                }
                className="p-2 border border-gray-300 rounded w-5/6"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4 w-1/6">
                Answer:
              </label>
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={faq.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
                className="p-2 border border-gray-300 rounded w-5/6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
