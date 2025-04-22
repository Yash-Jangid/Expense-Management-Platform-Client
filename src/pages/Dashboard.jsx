import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FileText, LogOut, Plus, Trash2, IndianRupee , PieChart, Download } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Dashboard() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ amount: '', category: 'Expense', description: '' });
    const [showForm, setShowForm] = useState(false);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/expenses');
            setExpenses(res.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const addExpense = async () => {
        try {
            await axios.post('/expenses', form);
            setForm({ amount: '', category: 'Expense', description: '' });
            fetchExpenses();
            setShowForm(false);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const downloadPDF = async () => {
        try {
            const res = await axios.get('/expenses/export/pdf', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense-report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('PDF is downloaded..');
        } catch (error) {
            toast.error('Error downloading PDF');
            console.error('Error downloading PDF:', error);
        }
    };

    const totalIncome = expenses
        .filter(e => e.category === 'Income')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalSpent = expenses
        .filter(e => e.category === 'Expense')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalOutstanding = totalIncome - totalSpent;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const getCategoryColor = (category) => {
        return category === 'Income' ? 'text-emerald-600' : 'text-rose-600';
    };

    const getCategoryBgColor = (category) => {
        return category === 'Income' ? 'bg-emerald-100' : 'bg-rose-100';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <IndianRupee className="h-8 w-8 text-blue-600" />
                            <h1 className="ml-2 text-xl font-bold text-gray-900">Finance</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={downloadPDF}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export PDF
                            </button>
                            <button
                                onClick={() => {
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    navigate('/login');
                                }}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 mr-4">
                                <IndianRupee className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Income</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalIncome)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-rose-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-rose-100 mr-4">
                                <IndianRupee className="h-6 w-6 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-emerald-100 mr-4">
                                <PieChart className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Balance</p>
                                <p className={`text-2xl font-bold ${totalOutstanding >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {formatCurrency(totalOutstanding)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
                                <span className="text-sm text-gray-500">{expenses.length} entries</span>
                            </div>

                            {expenses.length > 0 ? (
                                <div className="overflow-hidden">
                                    <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                                        {expenses.map((expense) => (
                                            <li key={expense.id} className="px-6 py-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={`${getCategoryBgColor(expense.category)} p-2 rounded-full mr-4`}>
                                                            <IndianRupee className={`h-5 w-5 ${getCategoryColor(expense.category)}`} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{expense.description || 'No Description'}</p>
                                                            <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className={`mr-4 font-semibold ${getCategoryColor(expense.category)}`}>
                                                            {expense.category === 'Income' ? '+' : '-'}{formatCurrency(expense.amount)}
                                                        </span>
                                                        <button
                                                            onClick={() => deleteExpense(expense.id)}
                                                            className="text-gray-400 hover:text-rose-600"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No transactions</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new transaction.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Add Transaction</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="amount"
                                            id="amount"
                                            value={form.amount}
                                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="What's this transaction for?"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={addExpense}
                                        disabled={!form.amount}
                                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${!form.amount ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Transaction
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}