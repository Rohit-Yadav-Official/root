import { FaChevronDown, FaCheck } from "react-icons/fa";
import { useMemo, useState } from "react";
import refresh from '../../assets/rotate-left.svg';
import '../sales/SalesFilters.css';

const FilterButton = ({
  name,
  label,
  options,
  openDropdown,
  selectedOptions,
  onToggleDropdown,
  onToggleOption,
  onApply,
}) => (
  <div style={{ position: "relative" }}>
    <button
      className={`filter-btn ${openDropdown === name ? "open" : ""} 
        ${selectedOptions.length > 0 ? "active" : ""}`}
      onClick={() => onToggleDropdown(name)}
    >
      {label}

      {selectedOptions.length > 0 && (
        <span className="filter-badge">
          {selectedOptions.length}
        </span>
      )}

      <FaChevronDown />
    </button>

    {openDropdown === name && (
      <div className="filter-dropdown open">
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => onToggleOption(name, option)}
            >
              <div className="dropdown-checkbox">
                <FaCheck />
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>

        <div className="dropdown-actions">
          <button
            className="dropdown-btn dropdown-btn-cancel"
            onClick={() => onToggleDropdown(null)}
          >
            Cancel
          </button>

          <button
            className="dropdown-btn dropdown-btn-apply"
            onClick={() => {
              onApply();
              onToggleDropdown(null);
            }}
          >
            Apply
          </button>
        </div>
      </div>
    )}
  </div>
);

const SORT_OPTIONS = [
  { value: "customer", label: "Customer Name (A-Z)" },
  { value: "customer-desc", label: "Customer Name (Z-A)" },
  { value: "date", label: "Date (Newest)" },
  { value: "quantity", label: "Quantity (Low to High)" },
];

export default function SalesFilters({ onFilterChange }) {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  const [selectedFilters, setSelectedFilters] = useState({
    region: [],
    gender: [],
    ageRange: [],
    category: [],
    tags: [],
    payment: [],
    date: []
  });

  const filterOptions = {
    region: ["North", "South", "East", "West", "Central"],
    gender: ["Male", "Female", "Other"],
    ageRange: ["18-25", "26-35", "36-45", "46-55", "55+"],
    category: ["Clothing", "Electronics", "Food", "Books", "Home"],
    tags: [
      "accessories",
      "beauty",
      "casual",
      "cotton",
      "fashion",
      "formal",
      "fragrance-free",
      "gadgets",
      "makeup",
      "organic",
      "portable",
      "skincare",
      "smart",
      "unisex",
      "wireless",
    ],
    payment: ["Cash", "Credit Card", "Debit Card", "UPI", "Net Banking"],
    date: ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Custom Range"]
  };

  const sortLabel = useMemo(
    () => SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Customer Name (A-Z)",
    [sortBy]
  );

  const toggleDropdown = (name) => {
    setSortOpen(false);
    setOpenDropdown(name);
  };

  const toggleOption = (filterName, option) => {
    setSelectedFilters((prev) => {
      const updated = prev[filterName].includes(option)
        ? prev[filterName].filter((v) => v !== option)
        : [...prev[filterName], option];
      return { ...prev, [filterName]: updated };
    });
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const buildDateRange = (dateSelections) => {
    if (!dateSelections?.length) return { dateStart: null, dateEnd: null };
    const choice = dateSelections[0]; // take the first selected range
    const today = new Date();

    switch (choice) {
      case "Today":
        return { dateStart: formatDate(today), dateEnd: formatDate(today) };
      case "Yesterday": {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const y = formatDate(d);
        return { dateStart: y, dateEnd: y };
      }
      case "Last 7 Days": {
        const start = new Date();
        start.setDate(start.getDate() - 6);
        return { dateStart: formatDate(start), dateEnd: formatDate(today) };
      }
      case "Last 30 Days": {
        const start = new Date();
        start.setDate(start.getDate() - 29);
        return { dateStart: formatDate(start), dateEnd: formatDate(today) };
      }
      default:
        return { dateStart: null, dateEnd: null };
    }
  };

  const buildAgeRange = (ranges) => {
    if (!ranges?.length) return { ageMin: null, ageMax: null };

    const bounds = ranges
      .map((r) => {
        if (r === "55+") return { min: 55, max: null };
        const [min, max] = r.split("-").map((v) => parseInt(v, 10));
        return { min, max };
      });

    const min = Math.min(...bounds.map((b) => b.min));
    const finiteMax = bounds.map((b) => b.max).filter((v) => Number.isFinite(v));
    const max = finiteMax.length ? Math.max(...finiteMax) : null;

    return { ageMin: min, ageMax: max };
  };

  const emitFilters = (nextSort = sortBy) => {
    const { dateStart, dateEnd } = buildDateRange(selectedFilters.date);
    const { ageMin, ageMax } = buildAgeRange(selectedFilters.ageRange);

    onFilterChange?.({
      search: "",
      sortBy: nextSort,
      page: 0,
      filter: {
        regions: selectedFilters.region,
        genders: selectedFilters.gender,
        ageMin,
        ageMax,
        categories: selectedFilters.category,
        paymentMethods: selectedFilters.payment,
        dateStart,
        dateEnd,
      },
    });
  };

  return (
    <div className="filters-container">
      {/* Reset Filters */}
      <button
        className="refresh-btn"
        title="Reset Filters"
        onClick={() => {
          const empty = {
            region: [],
            gender: [],
            ageRange: [],
            category: [],
            tags: [],
            payment: [],
            date: []
          };
          setSelectedFilters(empty);
          onFilterChange?.({
            search: "",
            sortBy: "date",
            page: 0,
            filter: {
              regions: [],
              genders: [],
              ageMin: null,
              ageMax: null,
              categories: [],
              paymentMethods: [],
              dateStart: null,
              dateEnd: null,
            },
          });
        }}
      >
        <img src={refresh} alt="reset" className="menu-icon" />
      </button>

      <FilterButton
        name="region"
        label="Customer Region"
        options={filterOptions.region}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.region}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="gender"
        label="Gender"
        options={filterOptions.gender}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.gender}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="ageRange"
        label="Age Range"
        options={filterOptions.ageRange}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.ageRange}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="category"
        label="Product Category"
        options={filterOptions.category}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.category}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="tags"
        label="Tags"
        options={filterOptions.tags}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.tags}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="payment"
        label="Payment Method"
        options={filterOptions.payment}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.payment}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />
      <FilterButton
        name="date"
        label="Date"
        options={filterOptions.date}
        openDropdown={openDropdown}
        selectedOptions={selectedFilters.date}
        onToggleDropdown={toggleDropdown}
        onToggleOption={toggleOption}
        onApply={emitFilters}
      />

      <div className="sort-container">
        <button
          className={`sort-btn ${sortOpen ? "open" : ""}`}
          onClick={() => {
            setOpenDropdown(null);
            setSortOpen((v) => !v);
          }}
        >
          Sort by: {sortLabel}
          <FaChevronDown />
        </button>

        {sortOpen && (
          <div className="filter-dropdown open">
            <div className="dropdown-options">
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${
                    sortBy === option.value ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSortBy(option.value);
                    emitFilters(option.value);
                    setSortOpen(false);
                  }}
                >
                  <div className="dropdown-checkbox">
                    <FaCheck />
                  </div>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
