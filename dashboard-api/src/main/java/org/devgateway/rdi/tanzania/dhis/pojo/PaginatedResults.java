package org.devgateway.rdi.tanzania.dhis.pojo;

/**
 * @author Sebastian Dimunzio
 */

public class PaginatedResults extends MetaDataResponse {


    Pager pager;

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }
}
