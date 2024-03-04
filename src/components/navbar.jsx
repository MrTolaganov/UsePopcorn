import Logo from "./logo";

const Navbar = ({ children }) => (
  <nav className="nav-bar">
    <Logo />
    {children}
  </nav>
);

export default Navbar;
