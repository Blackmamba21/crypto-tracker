import React from "react";
import Dropdown from "./Dropdown";
import { IoMdSwap } from "react-icons/io";
import { useEffect, useState } from "react";
const Currencyconverter = ({}) => {
  const [currencies, setCurrencies] = useState();
  const [currency, setCurrency] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => { 
   
    try {
      const url = "https://api.frankfurter.app/currencies";
     
      const currencies = await fetch(url);
      const jsonResult = await currencies.json();
      let currenciesArray = Object.keys(jsonResult);
      
      setCurrencies(currenciesArray);
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  const convertCurrency = async () => {
    try {
      const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
      const converted = await fetch(url);
      const jsonResult = await converted.json();
      console.log("🚀 ~ currencyConverter ~ jsonResult:", jsonResult);
      //   setCurrency(jsonResult?.rates);
      setConvertedAmount(jsonResult.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  return (
    <div className="max-w-xl my-10 p-4 bg-white shadow-md rounded-lg mx-auto">
      <h1 className="text-2xl mb-5  font-semibold text-gray-700">
        Currency Converter
      </h1>
      <div className=" grid grid-cols-3 ">
        <div>
          <Dropdown
            label={"From"}
            currencies={currencies}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
        </div>

        {/*swothc button */}
        <button
          className="justify-center items-center flex"
          onClick={swapCurrencies}
        >
          <IoMdSwap />
        </button>
        <div className=" flex ">
          <Dropdown
            label={"To"}
            currencies={currencies}
            currency={toCurrency}
            setCurrency={setToCurrency}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        <label
          htmlFor="amount"
          className="my-2 text-xl text-gray-700 outline-none "
        >
          Amount:
        </label>
        <input
          type="number"
          className="border border-gray-200 p-2 outline-none  rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className=" mt-4 flex justify-end">
        <button
          onClick={convertCurrency}
          className="px-4 p-2 bg-purple-700 rounded-md text-white"
        >
          Convert
        </button>
      </div>
      <div className=" mt-4 flex justify-end">
        <p className="text-xl text-green-400">
          Converted Amount : {convertedAmount}
        </p>
      </div>
    </div>
  );
};

export default Currencyconverter;
