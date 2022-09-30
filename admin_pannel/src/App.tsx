import { Routes, Route } from "react-router-dom";
import Dashboard from "./container/Dashboard";
import SideBar from "./components/SideBar";
import Alert from "./container/Alert";
import FormSection from "./components/FormSection";
import { useActiveTableContext } from "./context/ActiveTableContext";
import Header from "./container/Header";
import Content from "./components/Content";

function App() {
  const { activeTable } = useActiveTableContext();
  const fetchUrl =
    window.location.protocol === "http:"
      ? "http://localhost:8000/admin/backend"
      : window.location.href + "/backend";

  console.log(fetchUrl);

  return (
    <div className="min-h-screen flex flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <Alert />
      <SideBar fetchUrl={fetchUrl} />

      <div className="flex flex-1 flex-col">
        <Header activeTable={activeTable} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/model/:modelName/">
            <Route index element={<Content />} />
            <Route
              path="create"
              element={
                <FormSection activeTable={activeTable} fetchUrl={fetchUrl} />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
