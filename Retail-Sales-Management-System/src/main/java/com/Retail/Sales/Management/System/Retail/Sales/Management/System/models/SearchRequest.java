package com.Retail.Sales.Management.System.Retail.Sales.Management.System.models;

import lombok.Data;

@Data
public class SearchRequest {
    private String search;
    private SaleFilter filter;
    private String sortBy; // date, quantity, customer
    private int page;

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public SaleFilter getFilter() {
        return filter;
    }

    public void setFilter(SaleFilter filter) {
        this.filter = filter;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
