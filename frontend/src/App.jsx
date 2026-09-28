
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import api from './api/api';
import ServerLoading from './components/ServerLoading';


function App() {

  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await api.get("/health");

        if (response) {
          setServerReady(true);
        }
      } catch (error) {
        console.log("Waiting for backend server...");
      }
    };

    checkServer();

    if(!serverReady){
      const interval = setInterval(checkServer, 3000);
      return () => clearInterval(interval);
    }
    
  });

  if (!serverReady) {
    return <ServerLoading />;
  }

  return (
    <>
    <Navbar />
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
      <Route path='/signup' element={<GuestRoute><Signup /></GuestRoute>} />

      {/* Protected routes */}
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/books/create' element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
      <Route path='/books/details/:id' element={<ProtectedRoute><ShowBook /></ProtectedRoute>} />
      <Route path='/books/edit/:id' element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
      <Route path='/books/delete/:id' element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
