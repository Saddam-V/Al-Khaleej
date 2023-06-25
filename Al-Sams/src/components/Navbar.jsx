import Sams from "../assets/Khaleej.png";
import { Link, Form, redirect } from "react-router-dom";

function Navbar() {
  return (
    <header className="text-gray-600 body-font bg-opacity-40 bg-black rounded-full">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
          </svg> */}
          <img className="w-20 h-20 rounded-full" src={Sams} alt="image description"></img>

          <h1 class="mb-4 ml-14 text-lg font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
            AL
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-button from-emerald-600"> - KHALEEJ</span>
          </h1>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="../stockHistory/-createdAt" type="button" className="mr-5 hover:text-gray-900 text-button">
            Stocks
          </Link>
          <Link to="../billHistory/-createdAt" type="button" className="mr-5 hover:text-gray-900 text-button">
            Bills
          </Link>
          <Link to="../catalogue/-createdAt" type="button" className="mr-5 hover:text-gray-900 text-button">
            Catalogue
          </Link>
          <Link to="../customer/-createdAt" type="button" className="mr-5 hover:text-gray-900 text-button">
            Customers
          </Link>
          <Link to="../return/-createdAt" type="button" className="mr-5 hover:text-gray-900 text-button">
            Return
          </Link>
        </nav>
        <Link
          to="/logged-check"
          onClick={logOutNow}
          className="inline-flex items-center bg-button border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Sign Out
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;

function logOutNow() {
  localStorage.removeItem("token");
  localStorage.removeItem("log");
  return redirect("/logged-check");
}
