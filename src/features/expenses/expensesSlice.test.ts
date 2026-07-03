import expensesReducer, {
  addExpense,
  removeExpense,
  updateExpense,
  setCategoryFilter,
  clearExpenses,
  selectFilteredExpenses,
  selectTotalAmount,
  ExpensesState
} from './expensesSlice';

const initialState: ExpensesState = { items: [], categoryFilter: 'All' };

describe('expensesSlice reducer', () => {
  it('returns the initial state', () => {
    expect(expensesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles addExpense', () => {
    const state = expensesReducer(
      initialState,
      addExpense({ title: 'Coffee', amount: 4.5, category: 'Food', date: '2026-06-01' })
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      title: 'Coffee',
      amount: 4.5,
      category: 'Food'
    });
    expect(state.items[0].id).toBeDefined();
  });

  it('handles removeExpense', () => {
    const stateWithItem = expensesReducer(
      initialState,
      addExpense({ title: 'Coffee', amount: 4.5, category: 'Food', date: '2026-06-01' })
    );
    const id = stateWithItem.items[0].id;
    const state = expensesReducer(stateWithItem, removeExpense(id));
    expect(state.items).toHaveLength(0);
  });

  it('handles updateExpense', () => {
    const stateWithItem = expensesReducer(
      initialState,
      addExpense({ title: 'Coffee', amount: 4.5, category: 'Food', date: '2026-06-01' })
    );
    const existing = stateWithItem.items[0];
    const state = expensesReducer(
      stateWithItem,
      updateExpense({ ...existing, amount: 9.99 })
    );
    expect(state.items[0].amount).toBe(9.99);
  });

  it('handles setCategoryFilter', () => {
    const state = expensesReducer(initialState, setCategoryFilter('Food'));
    expect(state.categoryFilter).toBe('Food');
  });

  it('handles clearExpenses', () => {
    const stateWithItem = expensesReducer(
      initialState,
      addExpense({ title: 'Coffee', amount: 4.5, category: 'Food', date: '2026-06-01' })
    );
    const state = expensesReducer(stateWithItem, clearExpenses());
    expect(state.items).toHaveLength(0);
  });
});

describe('expensesSlice selectors', () => {
  const sampleState = {
    expenses: {
      categoryFilter: 'All' as const,
      items: [
        { id: '1', title: 'Coffee', amount: 4.5, category: 'Food' as const, date: '2026-06-01' },
        { id: '2', title: 'Bus', amount: 2, category: 'Transport' as const, date: '2026-06-02' }
      ]
    }
  };

  it('selectFilteredExpenses returns all items when filter is All', () => {
    expect(selectFilteredExpenses(sampleState)).toHaveLength(2);
  });

  it('selectFilteredExpenses filters by category', () => {
    const filteredState = {
      expenses: { ...sampleState.expenses, categoryFilter: 'Food' as const }
    };
    const result = selectFilteredExpenses(filteredState);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('Food');
  });

  it('selectTotalAmount sums the filtered expenses', () => {
    expect(selectTotalAmount(sampleState)).toBe(6.5);
  });
});
