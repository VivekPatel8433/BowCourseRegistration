
import './App.css';
import Home from './pages/HomePage'
import {Routes, Route } from 'react-router-dom';
import View from './view/view';
import AdminRouter from './components/admin-component/admin-dashboard-component/adminRouter'

function App() {
  return (
    <>
     <Routes>
        <Route element={<View />}>
          <Route index element={<Home />} />
          <Route path="create-account" element={null} />
          <Route path="admin/*" element={<AdminRouter />} />
          <Route path="student" element={null} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
