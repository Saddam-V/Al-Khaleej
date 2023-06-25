import { useState } from "react";

export default function Alert() {
  const [visible, setIsVisible] = useState(true);

  setTimeout(function () {
    setIsVisible(false);
  }, 1000);

  return <div className="App bg-green-100 rounded-lg">{visible && <p>Success</p>}</div>;
}
