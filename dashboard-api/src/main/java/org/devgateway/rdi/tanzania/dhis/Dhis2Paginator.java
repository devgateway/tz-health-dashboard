package org.devgateway.rdi.tanzania.dhis;

import org.devgateway.rdi.tanzania.dhis.pojo.PaginatedResults;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.query.Filter;
import org.hisp.dhis.query.Order;
import org.hisp.dhis.query.Paging;
import org.hisp.dhis.query.Query;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Iterator;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Dhis2Paginator<T> {

    private Integer currentPage = 1;
    private Integer pageSize = 20;
    private final String path;
    private final List<Filter> filters;
    private PaginatedResults paginatedResults;

    private final Dhis2 dhis2;

    private PaginatedResults getObject(String path, Query filters) {

        Iterator var4 = filters.getFilters().iterator();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromPath(path);
        String url;
        while (var4.hasNext()) {
            Filter filter = (Filter) var4.next();
            url = filter.getProperty() + ":" + filter.getOperator().value() + ":" + filter.getValue();
            uriBuilder.queryParam("filter", new Object[]{url});
        }

        Paging paging = filters.getPaging();
        if (paging.hasPaging()) {
            if (paging.hasPage()) {
                uriBuilder.queryParam("page", new Object[]{paging.getPage()});
            }

            if (paging.hasPageSize()) {
                uriBuilder.queryParam("pageSize", new Object[]{paging.getPageSize()});
            }
        } else {
            uriBuilder.queryParam("paging", new Object[]{"false"});
        }

        Order order = filters.getOrder();
        if (order.hasOrder()) {
            url = order.getProperty() + ":" + order.getDirection().name().toLowerCase();
            uriBuilder.queryParam("order", new Object[]{url});
        }

        url = uriBuilder.build().toUriString();

        return dhis2.getObject(url, PaginatedResults.class);
    }


    public Dhis2Paginator(String path, List<Filter> filters, Integer pageSize, Dhis2 dhis2) {
        this.path = path;
        this.filters = filters;
        this.pageSize = pageSize;
        this.dhis2 = dhis2;
    }


    //get results and inr
    public void getResults() {
        Query q = Query.instance();
        for (Filter f : this.filters) {
            q.addFilter(f);
        }
        q.withPaging(currentPage, pageSize);
        this.paginatedResults = getObject(path, q);

    }


    public boolean hasNext() {
        if (paginatedResults == null) {
            this.getResults();
        }

        if (paginatedResults.getPager().getPage() < paginatedResults.getPager().getPageCount()) {
            return true;
        }
        return false;
    }

    public PaginatedResults next() {
        if (this.paginatedResults.getPager().getPage() < currentPage) {
            this.getResults();
        }
        this.currentPage++; //increase page and get results
        return paginatedResults;

    }

}
