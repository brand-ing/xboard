import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">Home</Link>
    </nav>
  );
}

export default NavBar;
