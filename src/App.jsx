import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>

  );
}

export default App;
