import React, { useState, useContext } from "react";

import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";
const EditFaqSection: React.FC = () => {
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.eight ?? true);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = useState(state?.faqTitle ?? "");
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    state?.faqs ?? []
  );
  const [newFaq, setNewFaq] = useState<{ question: string; answer: string }>({
    question: "",
    answer: "",
  });

  const checkChanges = (
    x: { question: string; answer: string }[],
    y: { question: string; answer: string }[]
  ): void => {
    if (x.length !== y.length) {
      setSubmit(false);
      return;
    }

    const areObjectsEqual = (
      obj1: { [key: string]: string },
      obj2: { [key: string]: string }
    ): boolean => {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      return keys1.every((key) => obj1[key] === obj2[key]); // Check key-value pairs
    };

    // Sort both arrays by a consistent key, like 'question'
    const sortedX = [...x].sort((a, b) => a.question.localeCompare(b.question));
    const sortedY = [...y].sort((a, b) => a.question.localeCompare(b.question));

    const isEqual = sortedX.every((item, index) =>
      areObjectsEqual(item, sortedY[index])
    );

    setSubmit(isEqual);
  };

  //   const checkChanges = (
  //     x: { [key: string]: string }[],
  //     y: { [key: string]: string }[]
  //   ): void => {
  //     if (x.length !== y.length) {
  //       setSubmit(false);
  //       return; // Arrays of different lengths can't be equal
  //     }
  //     if (heading != state?.faqTitle) {
  //       setSubmit(false);
  //       return;
  //       }

  //     const areObjectsEqual = (
  //       obj1: { [key: string]: string },
  //       obj2: { [key: string]: string }
  //     ): boolean => {
  //       const keys1 = Object.keys(obj1);
  //       const keys2 = Object.keys(obj2);

  //       if (keys1.length !== keys2.length) {
  //         return false;
  //       }

  //       return keys1.every((key) => obj1[key] === obj2[key]); // Check if values for each key match
  //     };

  //     setSubmit(x.every((item, index) => areObjectsEqual(item, y[index])));
  //   };

  const handleFaqChange = (field: string, value: string) => {
    setNewFaq({ ...newFaq, [field]: value });
  };

  //   const handleAddFaq = () => {
  //     if (newFaq.question.trim() && newFaq.answer.trim()) {
  //       let temp = [...faqs, newFaq];
  //       setFaqs([...faqs, newFaq]);
  //       setNewFaq({ question: "", answer: "" });
  //       let x: {}[] = [temp];
  //       let y: {}[] = [state?.faqs];
  //       checkChanges(x, y);
  //     }
  //   };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const temp = [...faqs, newFaq]; // New array with the added FAQ
      setFaqs(temp); // Update the state with the new array
      setNewFaq({ question: "", answer: "" }); // Reset the input fields

      // Pass the correct structure to checkChanges
      checkChanges(temp, state?.faqs ?? []);
    }
  };

  const handleDeleteFaq = (index: number) => {
    const temp = faqs.filter((_, i) => i !== index); // Remove the FAQ at the specified index
    setFaqs(temp); // Update the state with the filtered array

    // Pass the correct structure to checkChanges
    checkChanges(temp, state?.faqs ?? []);
  };

  //   const handleDeleteFaq = (index: number) => {
  //     let temp = faqs.filter((_, i) => i !== index);
  //     setFaqs(temp);
  //     let x: {}[] = [temp];
  //     let y: {}[] = [state?.faqs];
  //     checkChanges(x, y);
  //   };
  const handleSubmit = () => {
    dispatch({
      type: "SET_EDITRD",
      payload: {
        faqTitle: heading,
        faqs: faqs,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        eight: true,
      },
    });
    setSubmit(true);
  };

  const handleHeadingChange = (newHeading: string) => {
    setHeading(newHeading);

    if (newHeading !== state?.faqTitle) {
      // Mark as unsaved if the heading is different from the original
      setSubmit(false);
    } else if (!submit) {
      // If heading matches but form is still unsaved, recheck the FAQs
      checkChanges(faqs, state?.faqs ?? []);
    }
  };

  //   const handleHeadingChange = (newHeading: string) => {
  //     setHeading(newHeading);
  //     if (newHeading != state?.faqTitle) {
  //       setSubmit(false);
  //     } else {
  //       if (submit == false) {
  //         let x: {}[] = [faqs];
  //         let y: {}[] = [state?.faqs];
  //         checkChanges(x, y);
  //       }
  //     }
  //   };

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
          onChange={(e) => handleHeadingChange(e.target.value)}
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

export default EditFaqSection;
