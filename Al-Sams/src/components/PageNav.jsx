import { useRef } from "react";
import { Link, useNavigate, redirect, useLocation } from "react-router-dom";

function PageNav() {
  const navigate = useNavigate();

  const changePage = (e) => {
    for (let i = 1; i < 6; i++) {
      document.getElementById(i).disabled = false;
      document.getElementById(i).style.backgroundColor = "#1f2937";
    }
    let full_path = location.pathname;
    let path = full_path.split("/");
    console.log(path);
    const page = e.currentTarget.getAttribute("page-value");
    const limit = e.currentTarget.getAttribute("limit-value");
    const pgNum = document.getElementById(page);
    pgNum.disabled = true;
    pgNum.style.backgroundColor = "gray";
    navigate("../" + path[1] + "/" + path[2] + "/" + page + "/" + limit);
  };
  return (
    <nav aria-label="Page navigation example" className="m-5 p-3 text-center w-full flex justify-center">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            onClick={changePage}
            page-value="1"
            id="1"
            limit-value="100"
            type="button"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </button>
        </li>
        <li>
          <button
            onClick={changePage}
            page-value="2"
            id="2"
            limit-value="100"
            type="button"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            2
          </button>
        </li>
        <li>
          <button
            onClick={changePage}
            page-value="3"
            id="3"
            limit-value="100"
            type="button"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            3
          </button>
        </li>
        <li>
          <button
            onClick={changePage}
            page-value="4"
            id="4"
            limit-value="100"
            type="button"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            4
          </button>
        </li>
        <li>
          <button
            onClick={changePage}
            page-value="5"
            id="5"
            limit-value="100"
            type="button"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            5
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
