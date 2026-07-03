import type { Expense } from '../features/expenses/types';
import { useAppDispatch } from '../app/hooks';
import { removeExpense } from '../features/expenses/expensesSlice';

interface Props {
  expense: Expense;
}

export default function ExpenseItem({ expense }: Props) {
  const dispatch = useAppDispatch();

  return (
    <li
      data-testid="expense-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid #f3f4f6'
      }}
    >
      <div>
        <strong>{expense.title}</strong>{' '}
        <span style={{ color: '#6b7280' }}>({expense.category})</span>
        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{expense.date}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span>${expense.amount.toFixed(2)}</span>
        <button
          aria-label={`Delete ${expense.title}`}
          onClick={() => dispatch(removeExpense(expense.id))}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
