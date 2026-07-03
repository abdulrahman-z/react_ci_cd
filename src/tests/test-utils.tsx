import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import expensesReducer, { ExpensesState } from '../features/expenses/expensesSlice';
import type { RootState } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: { expenses: ExpensesState };
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: { expenses: expensesReducer },
    preloadedState
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export type { RootState };
