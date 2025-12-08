import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import dashboard_icon from '../../assets/chart-square.svg';
import profile_2user from '../../assets/profile-2user.svg';
import play_circle from '../../assets/play-circle.svg';
import archive_book from '../../assets/archive-book.svg';
import document_text from '../../assets/document-text.svg';
import check from '../../assets/check.svg';
import close_circle from '../../assets/close-circle.svg';
import tick_circle from '../../assets/tick-circle.svg';
import document_favorite from '../../assets/document-favorite.svg';

import { useState } from "react";
import '../layout/Sidebar.css';

export default function Sidebar() {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <div className="sidebar">
      {/* this is Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-content">
          <div className="profile-avatar">V</div>
          <div className="profile-info">
            <p className="profile-name">Vault</p>
            <p className="profile-subtitle">Anurag Yadav</p>
          </div>
        </div>
        <FaChevronDown className="profile-chevron" />
      </div>

      {/* this is sidebar  navigation section */}
      <div className="sidebar-nav">
        {/* this is scetion Dashboard */}
        <div className="menu-item">
        <img src={dashboard_icon} alt="Search" className="menu-icon" />
          <span className="menu-item-text"> Dashboard</span>
        </div>

        {/*  this is section  Nexus */}
        <div className="menu-item">
        <img src={profile_2user} alt="Search" className="menu-icon" />
          <span className="menu-item-text">Nexus</span>
        </div>

        {/* this is section Intake */}
        <div className="menu-item">
        <img src={play_circle} alt="Search" className="menu-icon" />
          <span className="menu-item-text">Intake</span>
        </div>

        {/* Services - this is services section - Expandable */}
        <div className="services">

       
        <div 
          className={`menu-item-expandable ${servicesOpen ? 'expanded' : ''}`}
          onClick={() => setServicesOpen(!servicesOpen)}
        >
          <div className="menu-item-left">
          <img src={archive_book} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Services</span>
          </div>
          <FaChevronUp className="expand-icon" />
        </div>
        <div className={`submenu ${servicesOpen ? 'open' : ''}`}>
          <div className="submenu-item">
          <img src={play_circle} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Pre-active</span>
          </div>
          <div className="submenu-item">
          <img src={check} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Active</span>
          </div>
          <div className="submenu-item">
          <img src={close_circle} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Blocked</span>
          </div>
          <div className="submenu-item">
          <img src={tick_circle} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Closed</span>
          </div>
        </div> 
        
        </div>

        {/* Invoices - this is invoice section - Expandable */}
        <div className="invoices">

       
        <div 
          className={`menu-item-expandable ${invoicesOpen ? 'expanded' : ''}`}
          onClick={() => setInvoicesOpen(!invoicesOpen)}
        >
          <div className="menu-item-left">
          <img src={document_text} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Invoices</span>
          </div>
          <FaChevronUp className="expand-icon" />
        </div>
        <div className={`submenu ${invoicesOpen ? 'open' : ''}`}>
          <div className="submenu-item active">
          <img src={document_favorite} alt="Search" className="menu-icon" />
            <span className="menu-item-text"> Proforma Invoices</span>
          </div>
          <div className="submenu-item">
          <img src={document_favorite} alt="Search" className="menu-icon" />
            <span className="menu-item-text">Final Invoices</span>
          </div>
        </div>
      </div> </div>
    </div>
  );
}