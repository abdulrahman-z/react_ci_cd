import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div>
      <h1>Expenses ---- 2026</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
