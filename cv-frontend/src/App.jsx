import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentRegisterPage from './pages/StudentRegistrationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import QRPage from './pages/QRPage';
import HRLogin from './components/HRLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentRegisterPage />} />
        <Route path='/qr' element={<QRPage/>}/>
         <Route path="/hrlogin" element={<HRLogin />} />
         <Route
          path="/admin"
          element={
            <ProtectedRoute>
             <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
