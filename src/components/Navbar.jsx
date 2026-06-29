import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/watch-later" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Watch Later
      </NavLink>
      <NavLink to="/watched" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Watched
      </NavLink>
    </nav>
  )
}

export default Navbar
