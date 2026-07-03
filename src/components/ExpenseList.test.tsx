import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../tests/test-utils';
import ExpenseList from './ExpenseList';

const preloadedState = {
  expenses: {
    categoryFilter: 'All' as const,
    items: [
      { id: '1', title: 'Coffee', amount: 4.5, category: 'Food' as const, date: '2026-06-01' },
      { id: '2', title: 'Bus', amount: 2, category: 'Transport' as const, date: '2026-06-02' }
    ]
  }
};

describe('ExpenseList', () => {
  it('shows the empty state when there are no expenses', () => {
    renderWithProviders(<ExpenseList />, {
      preloadedState: { expenses: { items: [], categoryFilter: 'All' } }
    });
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders an item for each expense', () => {
    renderWithProviders(<ExpenseList />, { preloadedState });
    expect(screen.getAllByTestId('expense-item')).toHaveLength(2);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('Bus')).toBeInTheDocument();
  });

  it('removes an expense when delete is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ExpenseList />, { preloadedState });

    await user.click(screen.getByLabelText('Delete Coffee'));

    expect(store.getState().expenses.items).toHaveLength(1);
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
  });
});
