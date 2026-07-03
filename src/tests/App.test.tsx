import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../tests/test-utils';
import App from '../App';

describe('App routing', () => {
  it('renders the Dashboard at /', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByRole('heading', { name: /expense dashboard/i })).toBeInTheDocument();
  });

  it('renders the AddExpense page at /add', () => {
    renderWithProviders(<App />, { route: '/add' });
    expect(screen.getByRole('heading', { name: /add expense/i })).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', () => {
    renderWithProviders(<App />, { route: '/nonexistent' });
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });

  it('navigates from Dashboard to Add Expense via the navbar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/' });

    await user.click(screen.getByRole('link', { name: /add expense/i }));

    expect(await screen.findByRole('heading', { name: /^add expense$/i })).toBeInTheDocument();
  });
});
