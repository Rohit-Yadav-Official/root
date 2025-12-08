import search_icon from '../../assets/search-normal.svg';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      {/* this is search bar section  */}
      <div className="navbar-search-wrapper">
      <div className="navbar-search">
          <img src={search_icon} alt="Search" className="search-icon" />
          <input 
            type="text" 
            placeholder="Name, Phone no." 
            className="search-input"
          />
        </div>
      </div>

     
    </div>
  );
}