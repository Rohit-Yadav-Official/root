import { useState, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import SalesFilters from "../components/sales/SalesFilters";
import StatCards from "../components/sales/StatCards";
import SalesTable from "../components/sales/SalesTable";
import './Sales.css';


export default function Sales() {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "date",
    page: 0,
    filter: null,
  });

  const handleFilterChange = useCallback((nextFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...nextFilters,
      page: 0, // reset to first page whenever filters change
    }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  return (
    <div className="sales-page">
      <Sidebar />
      
      <div className="sales-content">
        {/* Header with Title and Navbar in same row */}
        <div className="sales-header-above-section">

       
        <div className="sales-header">
          <h1 className="sales-title">Sales Management System</h1>
          <Navbar />
        </div>

        <div className="sales-content-wrapper">
          {/* Filters */}
          <div className="sales-filters-section">
            <SalesFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Stats Cards */}
          <div className="sales-stats-section">
            <StatCards />
          </div> 
          
          </div> 
          </div>

          {/* Sales Table */}
          <div className="sales-table-section">
          <SalesTable filters={filters} onPageChange={handlePageChange} />
          </div>
          
       

      </div>
    </div>
  );
}