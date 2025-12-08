package com.Retail.Sales.Management.System.Retail.Sales.Management.System.Services;

import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.Sale;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.SearchRequest;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.repositories.SaleRepository;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.utils.SaleSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service

public class SaleService {

    private final SaleRepository repo;
    SaleService( SaleRepository repo ){
        this.repo=repo;
    }

    public Page<Sale> getSales(SearchRequest req) {

        Specification<Sale> spec = Specification
                .where(SaleSpecification.search(req.getSearch()))
                .and(SaleSpecification.filter(req.getFilter()));

        Sort sort = switch (req.getSortBy()) {
            case "date"     -> Sort.by("date").descending();
            case "quantity" -> Sort.by("quantity");
            case "customer" -> Sort.by("customerName");
            default -> Sort.unsorted();
        };

        Pageable pageable = PageRequest.of(req.getPage(), 10, sort);

        return repo.findAll(spec, pageable);
    }
}
