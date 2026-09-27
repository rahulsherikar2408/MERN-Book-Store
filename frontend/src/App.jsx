
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
    <Navbar />
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

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
