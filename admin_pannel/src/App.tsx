import { Routes, Route } from "react-router-dom";
import Dashboard from "./container/Dashboard";
import SideBar from "./components/SideBar";
import Alert from "./container/Alert";
import FormSection from "./components/FormSection";
import EditFormSection from "./components/EditFormSection";
import { useActiveTableContext } from "./context/ActiveTableContext";
import Header from "./container/Header";
import Content from "./components/ModelContentTable";

declare global {
  interface Window {
    fetchURL: string;
  }
}

function App() {
  const { activeTable } = useActiveTableContext();
  const fetchUrl =
    window.location.protocol === "http:"
      ? "http://localhost:8000/admin/backend"
      : window.location.href + "/backend";

  //declaring a global property coz fetchURL may be used all over app
  window.fetchURL = fetchUrl;

  console.log(fetchUrl);

  return (
    <div className="min-h-screen flex flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <Alert />
      <SideBar />

      <div className="flex flex-1 flex-col">
        <Header activeTable={activeTable} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/model/:modelName/">
            <Route index element={<Content activeTable={activeTable} />} />
            <Route
              path="create"
              element={<FormSection activeTable={activeTable} />}
            />
            <Route
              path="update/"
              element={<EditFormSection activeTable={activeTable} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
