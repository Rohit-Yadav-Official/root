import { useState, useEffect, useMemo } from "react";
import { getSales } from "../api/sales.api";

export function useSales(filters) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ totalElements: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const defaultFilter = useMemo(() => ({
    regions: [],
    genders: [],
    ageMin: null,
    ageMax: null,
    categories: [],
    paymentMethods: [],
    dateStart: null,
    dateEnd: null,
  }), []);

  const payload = useMemo(() => ({
    search: "",
    sortBy: "customer",
    page: 0,
    ...filters,
    filter: { ...defaultFilter, ...(filters?.filter || {}) },
  }), [filters, defaultFilter]);

  useEffect(() => {
    let isMounted = true;

    async function fetchSales() {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await getSales(payload); 
        if (!isMounted) return;

        const mapped = (res?.content ?? []).map((row) => ({
          // adapt backend fields to table expectations without changing UI structure
          transactionId: row.id ?? row.transactionId,
          date: row.date,
          customerId: row.customerId,
          customerName: row.customerName,
          phone: row.phoneNumber ?? row.phone,
          gender: row.gender,
          age: row.age,
          category: row.productCategory ?? row.category,
          quantity: row.quantity,
        }));

        setData(mapped);
        setMeta({
          totalElements: res?.totalElements ?? 0,
          totalPages: res?.totalPages ?? 0,
        });

      } catch (err) {
        if (isMounted) {
          setIsError(true);
          console.error(err);
        }

      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSales();

    return () => { isMounted = false; };
  }, [payload]);

  return { data, meta, isLoading, isError };
}
