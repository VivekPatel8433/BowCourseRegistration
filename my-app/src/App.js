import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./view/view";
import Home from "./pages/HomePage";
import CreateAccount from "./pages/CreateAccount";
import Admin from "./pages/AdminDashboard";
import Student from "./pages/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<View />}>
          <Route index element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
