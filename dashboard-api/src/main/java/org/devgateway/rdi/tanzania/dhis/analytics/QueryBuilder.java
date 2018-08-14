package org.devgateway.rdi.tanzania.dhis.analytics;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class QueryBuilder {

    boolean showColTotals = false;
    boolean showRowTotals = false;
    boolean showColSubTotals = false;
    boolean showRowSubTotals = false;

    String measureCriteria = null;

    String legendDisplayStyle = "FILL";

    String legendDisplayStrategy = "FIXED";


    List columns;
    List rows;
    List filters;


    public static QueryBuilder geInstance() {
        return new QueryBuilder();
    }

    public QueryBuilder addColumn(QueryDimension querySection) {
        if (columns == null) {
            columns = new ArrayList<>();
        }
        columns.add(querySection);
        return this;
    }

    public QueryBuilder addRow(QueryDimension querySection) {
        if (rows == null) {
            rows = new ArrayList<>();
        }
        rows.add(querySection);
        return this;
    }

    public QueryBuilder addFilter(QueryDimension querySection) {
        if (filters == null) {
            filters = new ArrayList<>();
        }
        filters.add(querySection);
        return this;
    }


    public String build() {

        StringBuilder dxBuilder = new StringBuilder();
        dxBuilder.append("dx:");

        //UriComponentsBuilder.fromPath("").queryParam("dimension","dx:")

        return null;
    }

}
