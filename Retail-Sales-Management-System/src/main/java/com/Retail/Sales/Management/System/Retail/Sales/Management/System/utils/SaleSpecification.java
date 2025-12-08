package com.Retail.Sales.Management.System.Retail.Sales.Management.System.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.Sale;
import com.Retail.Sales.Management.System.Retail.Sales.Management.System.models.SaleFilter;

import jakarta.persistence.criteria.Predicate;

public class SaleSpecification {

    public static Specification<Sale> search(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isEmpty()) return cb.conjunction();

            String likePattern = "%" + keyword.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("customerName")), likePattern),
                    cb.like(cb.lower(root.get("phoneNumber")), likePattern)
            );
        };
    }

    public static Specification<Sale> filter(SaleFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // If no filter provided, return everything
            if (filter == null) {
                return cb.conjunction();
            }

            // Helper lambdas to avoid empty list predicates that always return false
            boolean hasRegions = filter.getRegions() != null && !filter.getRegions().isEmpty();
            boolean hasGenders = filter.getGenders() != null && !filter.getGenders().isEmpty();
            boolean hasCategories = filter.getCategories() != null && !filter.getCategories().isEmpty();
            boolean hasPaymentMethods = filter.getPaymentMethods() != null && !filter.getPaymentMethods().isEmpty();

            if (hasRegions)
                predicates.add(root.get("customerRegion").in(filter.getRegions()));

            if (hasGenders)
                predicates.add(root.get("gender").in(filter.getGenders()));

            if (filter.getAgeMin() != null)
                predicates.add(cb.greaterThanOrEqualTo(root.get("age"), filter.getAgeMin()));

            if (filter.getAgeMax() != null)
                predicates.add(cb.lessThanOrEqualTo(root.get("age"), filter.getAgeMax()));

            if (hasCategories)
                predicates.add(root.get("productCategory").in(filter.getCategories()));

            if (hasPaymentMethods)
                predicates.add(root.get("paymentMethod").in(filter.getPaymentMethods()));

            if (filter.getDateStart() != null)
                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), filter.getDateStart()));

            if (filter.getDateEnd() != null)
                predicates.add(cb.lessThanOrEqualTo(root.get("date"), filter.getDateEnd()));

            return cb.and(predicates.toArray(Predicate[]::new));
        };
    }
}
