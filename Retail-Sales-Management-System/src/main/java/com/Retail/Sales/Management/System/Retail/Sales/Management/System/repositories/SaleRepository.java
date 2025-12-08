package com.Retail.Sales.Management.System.Retail.Sales.Management.System.repositories;

import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SaleRepository extends JpaRepository<Sale, Long>, JpaSpecificationExecutor<Sale> {
}
