import React, { useState, useContext } from "react";
import { RDContext, RDContextType } from "@/app/context/rdContext";
import { CondContext, CondContextType } from "@/app/context/submitStateContext";
import { EDITContext, EDITContextType } from "@/app/context/Edit/editContext";
import {
  EditCondContext,
  EditCondContextType,
} from "@/app/context/Edit/editStateContext";

const EditMajorPlayers: React.FC = () => {
  const { editstate, editdispatch } = useContext(
    EditCondContext
  ) as EditCondContextType;
  const [submit, setSubmit] = useState<boolean>(editstate?.six ?? true);
  const { state, dispatch } = useContext(EDITContext) as EDITContextType;
  const [heading, setHeading] = useState(state?.mpTitle ?? "");
  const [companies, setCompanies] = useState<string[]>(state?.mp ?? [""]);

  const checkChanges = (x: string[], y: string[]): void => {
    let size = x.length;
    if (size != y.length) {
      if (submit) {
        setSubmit(false);
        editdispatch({
          type: "CHANGE_EDIT_COND",
          payload: {
            two: false,
          },
        });
      }

      return;
    }
    for (let i = 0; i < size; i++) {
      console.log("at market players comp,at index i ", i);
      console.log("x[i] is ", x[i]);
      console.log("y[i] is ", y[i]);
      if (x[i] != y[i]) {
        // console.log("diffrences occur at index ", i);
        // console.log("x[i] is ", x[i]);
        // console.log("y[i] is ", y[i]);
        if (submit) {
          setSubmit(false);
          editdispatch({
            type: "CHANGE_EDIT_COND",
            payload: {
              two: false,
            },
          });
        }

        return;
      }
    }

    if (!submit) {
      setSubmit(true);
      editdispatch({
        type: "CHANGE_EDIT_COND",
        payload: {
          two: true,
        },
      });
    }
  };

  const addCompany = () => {
    let temp = [...companies, ""];
    setCompanies(temp);
    let comp = state?.mp;
    let x: string[] = [heading, ...temp];
    let y: string[] = [state?.mpTitle, ...comp];
    checkChanges(x, y);
  };

  const removeCompany = (index: number) => {
    let temp = companies.filter((_, i) => i !== index);
    let comp = state?.mp;
    setCompanies(temp);
    let x: string[] = [heading, ...temp];
    let y: string[] = [state?.mpTitle, ...comp];
    checkChanges(x, y);
  };

  const changeHeading = (newHeading: string) => {
    setHeading(newHeading);
    let comp = state?.mp;
    let x: string[] = [newHeading, ...companies];
    let y: string[] = [state?.mpTitle, ...comp];
    checkChanges(x, y);
  };

  const updateCompany = (index: number, value: string) => {
    const updatedCompanies = companies.map((company, i) =>
      i === index ? value : company
    );
    let comp = state?.mp;
    let x: string[] = [heading, ...updatedCompanies];
    let y: string[] = [state?.mpTitle, ...comp];
    setCompanies(updatedCompanies);
    checkChanges(x, y);
  };

  const handleSubmit = () => {
    if (submit) {
      return;
    }
    dispatch({
      type: "SET_EDITRD",
      payload: {
        mpTitle: heading,
        mp: companies,
      },
    });
    editdispatch({
      type: "CHANGE_EDIT_COND",
      payload: {
        six: true,
      },
    });
    setSubmit(true);
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
          onChange={(e) => changeHeading(e.target.value)}
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
            {
              <button
                onClick={() => removeCompany(index)}
                className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded"
              >
                &ndash;
              </button>
            }
          </div>
        ))}
        <button
          onClick={addCompany}
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mt-4"
        >
          Add Company Name
        </button>
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

export default EditMajorPlayers;
