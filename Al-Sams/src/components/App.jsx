import { useState } from "react";
import SideBar from "./Sidebar";
import Navbar from "./Navbar";
import NavBeforeLogin from "./NavBeforeLogin";
import RightPart from "../layouts/RightPart";
import "../App.css";

function App() {
  const [count, setCount] = useState(0);

  if (localStorage.getItem("log") == "true") {
    return (
      <main>
        <Navbar />
      </main>
    );
  } else {
    return (
      <main>
        <NavBeforeLogin />
      </main>
    );
  }
}

export default App;
