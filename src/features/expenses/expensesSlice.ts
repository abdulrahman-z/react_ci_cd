import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import type { Expense, NewExpense, ExpenseCategory } from './types';

export interface ExpensesState {
  items: Expense[];
  categoryFilter: ExpenseCategory | 'All';
}

const initialState: ExpensesState = {
  items: [],
  categoryFilter: 'All'
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: {
      reducer(state, action: PayloadAction<Expense>) {
        state.items.push(action.payload);
      },
      prepare(newExpense: NewExpense) {
        return { payload: { id: nanoid(), ...newExpense } };
      }
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<ExpensesState['categoryFilter']>) {
      state.categoryFilter = action.payload;
    },
    clearExpenses(state) {
      state.items = [];
    }
  }
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setCategoryFilter,
  clearExpenses
} = expensesSlice.actions;

export default expensesSlice.reducer;

// Selectors
export const selectAllExpenses = (state: { expenses: ExpensesState }) =>
  state.expenses.items;

export const selectCategoryFilter = (state: { expenses: ExpensesState }) =>
  state.expenses.categoryFilter;

export const selectFilteredExpenses = (state: { expenses: ExpensesState }) => {
  const { items, categoryFilter } = state.expenses;
  if (categoryFilter === 'All') return items;
  return items.filter((e) => e.category === categoryFilter);
};

export const selectTotalAmount = (state: { expenses: ExpensesState }) =>
  selectFilteredExpenses(state).reduce((sum, e) => sum + e.amount, 0);
