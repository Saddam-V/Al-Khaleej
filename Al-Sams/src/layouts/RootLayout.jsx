import { Outlet } from "react-router-dom";
import App from "../components/App";

function RootLayout() {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
}

export default RootLayout;
