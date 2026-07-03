import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../tests/test-utils';
import ExpenseForm from './ExpenseForm';

describe('ExpenseForm', () => {
  it('renders all fields', () => {
    renderWithProviders(<ExpenseForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  it('shows an error when submitting without a title', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExpenseForm />);

    await user.click(screen.getByRole('button', { name: /add expense/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/title is required/i);
  });

  it('shows an error for a non-positive amount', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExpenseForm />);

    await user.type(screen.getByLabelText(/title/i), 'Coffee');
    await user.type(screen.getByLabelText(/amount/i), '-5');
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/amount must be a positive number/i);
  });

  it('adds an expense to the store and navigates on valid submit', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ExpenseForm />);

    await user.type(screen.getByLabelText(/title/i), 'Coffee');
    await user.type(screen.getByLabelText(/amount/i), '4.50');
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(store.getState().expenses.items).toHaveLength(1);
    });
    expect(store.getState().expenses.items[0]).toMatchObject({
      title: 'Coffee',
      amount: 4.5
    });
  });
});
