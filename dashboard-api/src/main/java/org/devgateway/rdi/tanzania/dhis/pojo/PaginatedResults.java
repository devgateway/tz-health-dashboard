package org.devgateway.rdi.tanzania.dhis.pojo;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class PaginatedResults extends Results {


    Pager pager;

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }
}
