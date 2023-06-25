import { Outlet } from "react-router-dom";

function RightPart() {
  return (
    <>
      <div className="w-11/12 ml-44">
        <Outlet />
      </div>
    </>
  );
}

export default RightPart;
