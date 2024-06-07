import React from "react";

const Dropdown = ({ label, currencies, currency, setCurrency }) => {
  return (
    <div className="flex flex-col w-full ">
      <label htmlFor={label} className="mb-4">
        {label}:
      </label>
      <select
        name=""
        id=""
        className=" py-2 outline-none hover:ring-2 rounded-md bg-gray-200"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencies?.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
