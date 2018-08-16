package org.devgateway.rdi.tanzania.dhis.analytics;

import org.devgateway.rdi.tanzania.Dhis2AnalitycImport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class QueryBuilder {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2AnalitycImport.class);

    private static String PATH = "/29/analytics";
    private String displayProperty = "NAME";
    private boolean skipRounding = true;

    //&tableLayout=true&columns=ou;pe&rows=ou;pe
    List<QueryDimension> filters;
    List<QueryDimension> dimensions;


    public static QueryBuilder geInstance() {
        return new QueryBuilder();
    }

    public QueryBuilder addDimension(QueryDimension querySection) {
        if (dimensions == null) {
            dimensions = new ArrayList<>();
        }
        dimensions.add(querySection);
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
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath(PATH);
        if (this.dimensions != null) {
            this.dimensions.forEach(queryDimension -> {

                String items = queryDimension.getItems().stream().map(Item::getId).collect(Collectors.joining(";"));
                builder.queryParam("dimension", queryDimension.getDimension() + ":" + items);


            });
        }

        if (this.filters != null) {
            this.filters.forEach(queryDimension -> {
                String items = queryDimension.getItems().stream().map(Item::getId).collect(Collectors.joining(";"));
                builder.queryParam("filter", queryDimension.getDimension() + ":" + items);

            });
        }

        builder.queryParam("skipRounding", skipRounding);
        builder.queryParam("displayProperty", displayProperty);

        return builder.toUriString();
    }

}
