import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCategoryFilter,
  setCategoryFilter
} from '../features/expenses/expensesSlice';
import type { ExpenseCategory } from '../features/expenses/types';

const categories: (ExpenseCategory | 'All')[] = [
  'All',
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Other'
];

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectCategoryFilter);

  return (
    <label style={{ display: 'block', marginBottom: '1rem' }}>
      Filter by category:{' '}
      <select
        value={currentFilter}
        onChange={(e) =>
          dispatch(setCategoryFilter(e.target.value as ExpenseCategory | 'All'))
        }
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </label>
  );
}
