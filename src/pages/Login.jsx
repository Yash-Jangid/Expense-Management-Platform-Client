import { TextField, Button } from '@mui/material';
import axios from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', form);
    localStorage.setItem('accessToken', res.data.token); 
    localStorage.setItem('refreshToken', 'dummy-refresh-token');
    navigate('/dashboard');
  };

  return (
    <form className="max-w-sm mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
      <TextField fullWidth label="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <TextField fullWidth label="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button fullWidth variant="contained" type="submit">Login</Button>
    </form>
  );
}
