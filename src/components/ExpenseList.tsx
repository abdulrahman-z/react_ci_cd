import { useAppSelector } from '../app/hooks';
import { selectFilteredExpenses } from '../features/expenses/expensesSlice';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const expenses = useAppSelector(selectFilteredExpenses);

  if (expenses.length === 0) {
    return <p data-testid="empty-state">No expenses yet. Add one to get started!</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
}
