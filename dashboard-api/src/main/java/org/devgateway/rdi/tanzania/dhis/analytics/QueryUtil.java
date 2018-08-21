package org.devgateway.rdi.tanzania.dhis.analytics;

import org.devgateway.rdi.tanzania.domain.Facility;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class QueryUtil {

    public static QueryDimension THIS_WEEK() {
        return new QueryDimension("pe", "Period").adItem("THIS_WEEK", "THIS_WEEK");
    }

    public static QueryDimension LAST_WEEK() {
        return new QueryDimension("pe", "Period").adItem("LAST_WEEK", "LAST_WEEK");
    }

    public static QueryDimension LAST_4_WEEKS() {
        return new QueryDimension("pe", "Period").adItem("LAST_4_WEEKS", "LAST_4_WEEKS");
    }

    public static QueryDimension LAST_12_WEEKS() {
        return new QueryDimension("pe", "Period").adItem("LAST_12_WEEKS", "LAST_12_WEEKS");
    }

    public static QueryDimension LAST_52_WEEKS() {
        return new QueryDimension("pe", "Period").adItem("LAST_52_WEEKS", "LAST_52_WEEKS");
    }


    public static QueryDimension THIS_MONTH() {
        return new QueryDimension("pe", "Period").adItem("THIS_MONTH", "THIS_MONTH");
    }

    public static QueryDimension LAST_MONTH() {
        return new QueryDimension("pe", "Period").adItem("LAST_MONTH", "LAST_MONTH");
    }


    public static QueryDimension THIS_BIMONTH() {
        return new QueryDimension("pe", "Period").adItem("THIS_BIMONTH", "THIS_BIMONTH");
    }

    public static QueryDimension LAST_BIMONTH() {
        return new QueryDimension("pe", "Period").adItem("LAST_BIMONTH", "LAST_BIMONTH");
    }


    public static QueryDimension THIS_QUARTER() {
        return new QueryDimension("pe", "Period").adItem("THIS_QUARTER", "THIS_QUARTER");
    }

    public static QueryDimension LAST_QUARTER() {
        return new QueryDimension("pe", "Period").adItem("LAST_QUARTER", "LAST_QUARTER");
    }


    public static QueryDimension THIS_SIX_MONTH() {
        return new QueryDimension("pe", "Period").adItem("THIS_SIX_MONTH", "THIS_SIX_MONTH");
    }

    public static QueryDimension LAST_SIX_MONTH() {
        return new QueryDimension("pe", "Period").adItem("LAST_SIX_MONTH", "LAST_SIX_MONTH");
    }


    public static QueryDimension MONTHS_THIS_YEAR() {
        return new QueryDimension("pe", "Period").adItem("MONTHS_THIS_YEAR", "MONTHS_THIS_YEAR");
    }

    public static QueryDimension QUARTERS_THIS_YEAR() {
        return new QueryDimension("pe", "Period").adItem("QUARTERS_THIS_YEAR", "QUARTERS_THIS_YEAR");
    }

    public static QueryDimension THIS_YEAR() {
        return new QueryDimension("pe", "Period").adItem("THIS_YEAR", "THIS_YEAR");
    }


    public static QueryDimension MONTHS_LAST_YEAR() {
        return new QueryDimension("pe", "Period").adItem("MONTHS_LAST_YEAR", "MONTHS_LAST_YEAR");
    }

    public static QueryDimension QUARTERS_LAST_YEAR() {
        return new QueryDimension("pe", "Period").adItem("QUARTERS_LAST_YEAR", "QUARTERS_LAST_YEAR");
    }

    public static QueryDimension LAST_YEAR() {
        return new QueryDimension("pe", "Period").adItem("LAST_YEAR", "LAST_YEAR");
    }

    public static QueryDimension LAST_5_YEARS() {
        return new QueryDimension("pe", "Period").adItem("LAST_5_YEARS", "LAST_5_YEARS");
    }

    public static QueryDimension Y2017() {
        return new QueryDimension("pe", "Period").adItem("2017", "2017");
    }

    public static QueryDimension LAST_12_MONTHS() {
        return new QueryDimension("pe", "Period").adItem("LAST_12_MONTHS", "LAST_12_MONTHS");
    }

    public static QueryDimension LAST_3_MONTHS() {
        return new QueryDimension("pe", "Period").adItem("LAST_3_MONTHS", "LAST_3_MONTHS");
    }

    public static QueryDimension LAST_6_BIMONTHS() {
        return new QueryDimension("pe", "Period").adItem("LAST_6_BIMONTHS", "LAST_6_BIMONTHS");
    }

    public static QueryDimension LAST_4_QUARTERS() {
        return new QueryDimension("pe", "Period").adItem("LAST_4_QUARTERS", "LAST_4_QUARTERS");
    }

    public static QueryDimension LAST_2_SIXMONTHS() {
        return new QueryDimension("pe", "Period").adItem("LAST_2_SIXMONTHS", "LAST_2_SIXMONTHS");
    }

    public static QueryDimension THIS_FINANCIAL_YEAR() {
        return new QueryDimension("pe", "Period").adItem("THIS_FINANCIAL_YEAR", "THIS_FINANCIAL_YEAR");
    }

    public static QueryDimension LAST_FINANCIAL_YEAR() {
        return new QueryDimension("pe", "Period").adItem("LAST_FINANCIAL_YEAR", "LAST_FINANCIAL_YEAR");
    }

    public static QueryDimension LAST_5_FINANCIAL_YEARS() {
        return new QueryDimension("pe", "Period").adItem("LAST_5_FINANCIAL_YEARS", "LAST_5_FINANCIAL_YEARS");
    }


    public static QueryDimension MONTHS_OF_2017() {
        return new QueryDimension("pe", "Period")
                .adItem("201701", "January")
                .adItem("201702", "February")
                .adItem("201703", "March")
                .adItem("201704", "April")
                .adItem("201705", "May")
                .adItem("201706", "June")
                .adItem("201707", "July")
                .adItem("201708", "August")
                .adItem("201709", "September")
                .adItem("201710", "October")
                .adItem("201711", "November")
                .adItem("201712", "December");

    }


    public static QueryDimension ouDimension() {
        return new QueryDimension("ou", "Org Unit");
    }


    public static QueryDimension ouDimension(List<Item> items) {
        QueryDimension queryDimension = ouDimension();
        queryDimension.setItems(items);
        return queryDimension;
    }


    public static QueryDimension dxDimension() {
        return new QueryDimension("dx", "Data");
    }

    public static QueryDimension dxDimension(List<Item> items) {
        QueryDimension queryDimension = dxDimension();
        queryDimension.setItems(items);
        return queryDimension;
    }


    public static QueryDimension dxDimension(Item item) {
        QueryDimension queryDimension = dxDimension();
        queryDimension.adItem(item);
        return queryDimension;
    }

    public static Item item2Item
            (org.devgateway.rdi.tanzania.domain.Item item) {
        return new Item(item.getDhis2Id(), item.getName());
    }


    public static List<Item> items2Items
            (List<org.devgateway.rdi.tanzania.domain.Item> items) {
        return items.stream().map(item -> new Item(item.getDhis2Id(), item.getName())).collect(Collectors.toList());
    }


    public static Item dataElement2Item
            (org.devgateway.rdi.tanzania.domain.DataElement
                     dataElement) {
        return new Item(dataElement.getDhis2Id(), dataElement.getName());
    }


    public static Item org2Item(Facility facility) {
        return new Item(facility.getDhis2Id(), facility.getName());
    }
}
