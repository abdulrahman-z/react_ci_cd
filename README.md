# Expense Tracker

A simple expense tracker built with React, TypeScript, React Router DOM v6, Redux Toolkit, and tested with React Testing Library + Jest.

## Features
- Add expenses (title, amount, category, date) with form validation
- View all expenses on a dashboard with a running total
- Filter expenses by category
- Delete individual expenses
- Client-side routing between Dashboard and Add Expense pages, plus a 404 page

## Tech stack
- **React 18 + TypeScript** — UI and type safety
- **React Router DOM v6** — `/` (Dashboard) and `/add` (Add Expense) routes
- **Redux Toolkit** — `expensesSlice` manages state (add/remove/update/filter), with memoized selectors for filtered list and total
- **Vite** — dev server and build tool
- **React Testing Library + Jest (ts-jest)** — unit tests for the slice/selectors and component/integration tests for forms, lists, and routing

## Getting started
```bash
npm install
npm run dev      # start the dev server
npm run test     # run the test suite
npm run build    # type-check and build for production
```

## Project structure
```
src/
  app/                store.ts, hooks.ts (typed Redux hooks)
  features/expenses/  expensesSlice.ts, types.ts, slice tests
  components/         Navbar, ExpenseForm, ExpenseList, ExpenseItem,
                       CategoryFilter, TotalSummary (+ component tests)
  pages/               Dashboard, AddExpense, NotFound
  tests/               test-utils.tsx (Provider/Router render helper),
                       setupTests.ts, App.test.tsx
  App.tsx, main.tsx
```

## Test coverage
- `expensesSlice.test.ts` — reducers (add/remove/update/filter/clear) and selectors
- `ExpenseForm.test.tsx` — validation errors and successful submission updating the store
- `ExpenseList.test.tsx` — empty state, rendering items, deleting an item
- `App.test.tsx` — routing between Dashboard, Add Expense, and 404, plus navbar navigation

Run `npm run test` to execute all 20 tests across these 4 suites.
