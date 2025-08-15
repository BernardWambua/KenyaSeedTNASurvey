import kenyaseedlogo from '../images/kenya-seed-logo.png';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={{ backgroundColor: 'darkgreen' }}>
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={kenyaseedlogo} alt="Kenya Seed Logo" style={{maxHeight: '3rem', width: 'auto' }} />
        </a>  
      </div>
      <div className="navbar-menu">
        <a className="navbar-item" href="/" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'yellow', backgroundColor: 'darkgreen', padding: '8px 16px', borderRadius: '6px' }}>
          Training Needs Analysis Survey
        </a>
      </div>
    </nav>
  );                
}

export default Navbar;
