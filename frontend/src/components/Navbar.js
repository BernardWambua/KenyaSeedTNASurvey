import logo from '../images/logo.jpeg';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={{ backgroundColor: 'darkgreen' }}>
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="KenGen Logo" style={{ maxHeight: '3rem', width: 'auto' }} />
        </a>  
      </div>
      <div className="navbar-menu">
        <a className="navbar-item" href="/" style={{ color: 'yellow' }}>
          Training Needs Analysis Survey
        </a>
      </div>
    </nav>
  );                
}

export default Navbar;
