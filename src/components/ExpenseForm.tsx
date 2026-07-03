import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addExpense } from '../features/expenses/expensesSlice';
import type { ExpenseCategory } from '../features/expenses/types';

const categories: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Other'
];

export default function ExpenseForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    dispatch(
      addExpense({
        title: title.trim(),
        amount: parsedAmount,
        category,
        date
      })
    );

    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="amount">Amount</label>
        <br />
        <input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="category">Category</label>
        <br />
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="date">Date</label>
        <br />
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && (
        <p role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <button type="submit">Add Expense</button>
    </form>
  );
}
