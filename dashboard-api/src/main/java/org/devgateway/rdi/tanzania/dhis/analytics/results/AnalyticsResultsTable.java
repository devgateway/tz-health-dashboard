package org.devgateway.rdi.tanzania.dhis.analytics.results;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class AnalyticsResultsTable {
    List<Header> headers;
    Integer height;
    List<String[]> rows;
    Metadata metaData;

    public List<Header> getHeaders() {
        return headers;
    }

    public void setHeaders(List<Header> headers) {
        this.headers = headers;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public List<String[]> getRows() {
        return rows;
    }

    public void setRows(List<String[]> rows) {
        this.rows = rows;
    }

    public Metadata getMetaData() {
        return metaData;
    }

    public void setMetaData(Metadata metaData) {
        this.metaData = metaData;
    }
}
