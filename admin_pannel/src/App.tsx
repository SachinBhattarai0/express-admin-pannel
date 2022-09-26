import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import Body from "./components/Body";

function App() {
  const fetchUrl =
    window.location.protocol === "http:"
      ? "http://localhost:8000/admin/backend/model-infos/"
      : window.location.href + "/backend/model-infos/";
  console.log(fetchUrl);

  return (
    <div className="min-h-screen flex flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <SideBar fetchUrl={fetchUrl} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/model/:modelName" element={<Body />} />
      </Routes>
    </div>
  );
}

export default App;
