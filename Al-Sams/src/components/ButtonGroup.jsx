import { useRef } from "react";
import { Link, useNavigate, redirect, useLocation } from "react-router-dom";

function ButtonGroup() {
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const textInput = useRef(null);
  const orderInput = useRef(null);
  const searchInput = useRef(null);
  function searchFunc() {
    let val = document.getElementById("simple-search").value;
    const valArray = val.split(" ");
    console.log("Searching...");
    if (path.includes("total-stock")) {
      navigate("/total-stock/search/" + valArray[0] + "/" + valArray[1]);
    } else if (path.includes("stockHistory")) {
      navigate("/stockHistory/search/" + valArray[0] + "/" + valArray[1]);
    }
  }
  function applyFilter() {
    if (path.includes("total-stock")) {
      if (orderInput.current.value === "AS") {
        navigate("/total-stock/" + textInput.current.value);
      } else {
        const qry = "-" + textInput.current.value.toString();
        console.log(qry);
        navigate("/total-stock/" + qry);
      }
    } else if (path.includes("stockHistory")) {
      if (orderInput.current.value === "AS") {
        navigate("/stockHistory/" + textInput.current.value);
      } else {
        const qry = "-" + textInput.current.value.toString();
        console.log(qry);
        navigate("/stockHistory/" + qry);
      }
    }
  }

  return (
    <>
      <div className="flex flex-row justify-around">
        {/*  */}

        <div className="inline-flex shadow-sm m-14" role="group">
          <Link
            id="addstockbutton"
            to="../create-stock"
            className="h-10 w-32 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Add Stock
          </Link>
          <Link
            to="../stockHistory/-createdAt"
            className="h-10 w-32 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Stock History
          </Link>
          <Link
            to="../total-stock/-createdAt"
            className="h-10 w-32 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Total Stock
          </Link>
          {/* <Link
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Export To CSV
          </Link>
          <Link
            type="button"
            className=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Export To Excel
          </Link> */}
        </div>
        {/* ------------------------------------------------------------------------------------------------------------------------------------- */}
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              ref={searchInput}
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Catalogue"
              required
            ></input>
          </div>
          <p
            onClick={searchFunc}
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              onClick={searchFunc}
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span onClick={searchFunc} class="sr-only">
              Search
            </span>
          </p>
        </form>
        {/*  */}
        {/* ------------------------------------------------------------------------------------------------------------------------------------- */}
        <div>
          <select
            ref={textInput}
            name="option"
            id="countries"
            className="bg-gray-50 border form-multiselect h-11 inline-flex rounded-l shadow-sm md:ml-14 sm:mt-14 md:mb-14 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-14 lg:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Sort By</option>
            <option value="catNum">Catalogue Number</option>
            <option value="colNum">Color Number</option>
            {/* <option value="rate">Rate</option> */}
            <option value="meter">Meter</option>
            <option value="createdAt">Date</option>
          </select>
          <select
            ref={orderInput}
            name="order"
            id="countries"
            className="bg-gray-50 border form-select h-11 inline-flex rounded-r shadow-sm md:mr-14 sm:mt-14 md:mb-14 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-14 lg:w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Order</option>
            <option value="AS">Ascending</option>
            <option value="DS">Descending</option>
          </select>
          <button onClick={applyFilter}>Apply</button>
        </div>
      </div>
    </>
  );
}
export default ButtonGroup;
