import { TextField, Button } from '@mui/material';
import axios from '../api/axios';
import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      toast.success('Registered successfully. You can now login.');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <div className='flex justify-center items-center bg-black/70 w-full h-[100vh]'>
      <div className='bg-white p-4 rounded-lg space-y-3'>
        <div className='text-2xl'>Register yourself..</div>
        <form className="max-w-sm mx-auto mt-10 space-y-4" onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button fullWidth variant="contained" type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
