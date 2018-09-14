package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Item;

/**
 * @author Sebastian Dimunzio
 */

public class OPDResponse {

    private DataElement diagnostic;

    private Item age;

    private Integer year;

    private Integer quarter;

    private Integer month;

    private Long value;

    public OPDResponse() {
    }

    public OPDResponse(DataElement diagnostic, Long value) {
        this.diagnostic = diagnostic;
        this.value = value;
    }

    public OPDResponse(DataElement diagnostic, Integer year, Long value) {
        this.diagnostic = diagnostic;
        this.year = year;
        this.value = value;
    }

    public OPDResponse(DataElement diagnostic, Item age, Integer year, Long value) {
        this.diagnostic = diagnostic;
        this.age = age;
        this.year = year;
        this.value = value;
    }


    public OPDResponse(DataElement diagnostic, Item age, Integer year, Integer quarter, Long value) {
        this.diagnostic = diagnostic;
        this.age = age;
        this.year = year;
        this.quarter = quarter;

        this.value = value;
    }

    public OPDResponse(DataElement diagnostic, Item age, Integer year, Integer quarter, Integer month, Long value) {
        this.diagnostic = diagnostic;
        this.age = age;
        this.year = year;
        this.quarter = quarter;
        this.month = month;
        this.value = value;
    }


    public DataElement getDiagnostic() {
        return
                diagnostic;
    }

    public void setDiagnostic(DataElement diagnostic) {
        this.diagnostic = diagnostic;
    }

    public Item getAge() {
        return age;
    }

    public void setAge(Item age) {
        this.age = age;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }
}
