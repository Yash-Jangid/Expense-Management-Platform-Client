import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { TextField, Button, MenuItem } from '@mui/material';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ amount: '', category: '', description: '' });

    const fetchExpenses = async () => {
        const res = await axios.get('/expenses');
        setExpenses(res.data);
    };

    const addExpense = async () => {
        await axios.post('/expenses', form);
        setForm({ amount: '', category: '', description: '' });
        fetchExpenses();
    };

    const deleteExpense = async (id) => {
        await axios.delete(`/expenses/${id}`);
        fetchExpenses();
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const downloadPDF = async () => {
        const res = await axios.get('/expenses/export', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expense-report.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };


    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="space-y-3 mb-5">
                <TextField fullWidth label="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                <TextField
                    select
                    fullWidth
                    label="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </TextField>
                <TextField fullWidth label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Button fullWidth variant="contained" onClick={addExpense}>Add Expense</Button>
            </div>
            <div className='w-full justify-end items-end bg-red-400'>
                <Button fullWidth variant="outlined" onClick={downloadPDF} className="mb-4">
                    Export to PDF
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    className="mb-4"
                    onClick={() => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                    }}
                >
                    Logout
                </Button>
            </div>

            <div className="bg-white shadow rounded-lg p-4 space-y-2">
                {expenses.map((e) => (
                    <div key={e.id} className="flex justify-between items-center border-b py-2">
                        <div>
                            <div>{e.category}: ${e.amount}</div>
                            <div className="text-sm text-gray-500">{e.description}</div>
                        </div>
                        <Button color="error" onClick={() => deleteExpense(e.id)}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
