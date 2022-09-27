import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import Body from "./components/Body";

function App() {
  const fetchUrl =
    window.location.protocol === "http:"
      ? "http://localhost:8000/admin/backend"
      : window.location.href + "/backend";

  console.log(fetchUrl);

  return (
    <div className="min-h-screen flex flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <SideBar fetchUrl={fetchUrl} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/model/:modelName"
          element={<Body fetchUrl={fetchUrl} />}
        />
      </Routes>
    </div>
  );
}

export default App;
