import {React} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from "./view/view";

// Temporary placeholder pages
function Home() {
  return <h1 className="text-center text-2xl py-10">Home Page</h1>;
}
function CreateAccount() {
  return <h1 className="text-center text-2xl py-10">Create Account</h1>;
}
function Admin() {
  return <h1 className="text-center text-2xl py-10">Admin Dashboard</h1>;
}
function Student() {
  return <h1 className="text-center text-2xl py-10">Student Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<View />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
