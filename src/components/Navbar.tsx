import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  marginRight: '1rem',
  fontWeight: isActive ? 700 : 400,
  textDecoration: 'none',
  color: isActive ? '#2563eb' : '#374151'
});

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
      <NavLink to="/" style={linkStyle} end>
        Dashboard
      </NavLink>
      <NavLink to="/add" style={linkStyle}>
        Add Expense
      </NavLink>
    </nav>
  );
}
