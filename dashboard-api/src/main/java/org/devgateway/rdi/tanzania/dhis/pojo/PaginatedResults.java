package org.devgateway.rdi.tanzania.dhis.pojo;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class PaginatedResults<T> {

    List<SingleObject> dataElements;
    Pager pager;

    public List<SingleObject> getDataElements() {
        return dataElements;
    }

    public void setDataElements(List<SingleObject> dataElements) {
        this.dataElements = dataElements;
    }

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }
}
