import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

export default function Layout() {
  return <article className="container">
    <Header />
    <Outlet />
  </article>;
}