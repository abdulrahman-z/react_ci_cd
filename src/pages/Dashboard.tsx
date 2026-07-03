import TotalSummary from '../components/TotalSummary';
import CategoryFilter from '../components/CategoryFilter';
import ExpenseList from '../components/ExpenseList';

export default function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Expense Dashboard</h1>
      <TotalSummary />
      <CategoryFilter />
      <ExpenseList />
    </div>
  );
}
