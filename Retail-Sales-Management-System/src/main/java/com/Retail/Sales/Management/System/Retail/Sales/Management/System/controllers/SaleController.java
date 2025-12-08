package com.Retail.Sales.Management.System.Retail.Sales.Management.System.controllers;


import com.Retail.Sales.Management.System.Retail.Sales.Management.System.Services.SaleService;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.Sale;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/sales")
public class SaleController {


    private final SaleService saleService;
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping("/filter")
    public Page<Sale> getSales(@RequestBody SearchRequest request) {
        return saleService.getSales(request);
    }
}

