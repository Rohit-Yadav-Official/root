import '../sales/SalesTables.css';
import { useSales } from "../../hooks/useSales";

export default function SalesTable({ filters, onPageChange }) {
  const { data, meta, isLoading, isError } = useSales(filters);
  const currentPage = filters?.page ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  const pageNumbers = (() => {
    if (!totalPages) return [];
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i);

    if (currentPage < 3) return [0, 1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 3)
      return Array.from({ length: 6 }, (_, i) => totalPages - 6 + i);

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
    ];
  })();

  if (isLoading) return <p>Loading sales...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((row, i) => (
            <tr key={i}>
              <td>{row.transactionId}</td>
              <td>{row.date}</td>
              <td>{row.customerId}</td>
              <td>{row.customerName}</td>
              <td>
                <div className="phone-number-cell">
                  {row.phone}
                  <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9"></path>
                  </svg>
                </div>
              </td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.category}</td>
              <td className="highlight">{row.quantity}</td>
              <td className="highlight">{row.totalAmount}</td>
              <td className="highlight">{row.customerRegion}</td>
              <td className="highlight">{row.productId}</td>
              <td className="highlight">{row.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {pageNumbers.map((p) => (
            <button
              key={p}
              className={`page-btn ${p === currentPage ? "active" : ""}`}
              onClick={() => onPageChange?.(p)}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
